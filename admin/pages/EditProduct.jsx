import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAdminApi from "../store/useAdminApi";

const MAX_IMAGE_SIZE = 1 * 1024 * 1024; // 1 MB

const Editproduct = () => {
  const navigate = useNavigate();
  const { product_id } = useParams();
  const api = useAdminApi();
  const {
    fetchSingleProduct,
    isAddingProduct,
    isFetchingProduct,
    productData,
    // possible submit function names — we'll pick the first available below
    updateProduct,
    addProduct,
    product: productApi,
  } = api;

  const msgRef = useRef(null);

  // images: array of { id?: string, url: string, file?: File, isNew: boolean }
  const [images, setImages] = useState([]);
  const [product, setProduct] = useState({
    product_images: [],
    product_name: "",
    product_price: "",
    product_quantity: "",
    product_category: "",
    product_description: "",
  });

  // choose submit function (adapt if your hook uses different name/signature)
  const submitFn = updateProduct || addProduct || productApi;

  // show message helper
  const showMessage = (msg, success = false) => {
    try {
      if (!msgRef.current) return;
      msgRef.current.textContent = msg;
      msgRef.current.className = success ? "success" : "error";
      msgRef.current.style.color = success ? "#008319" : "#bd2707";
      window.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(() => {
        if (!msgRef.current) return;
        msgRef.current.textContent = "";
        msgRef.current.removeAttribute("class");
      }, 2500);
    } catch (e) {
      // fail silently
    }
  };

  // populate product and images when productData loads
  useEffect(() => {
    if (!productData) return;
    const info = productData.product_info || {};
    setProduct({
      product_images: productData.product_images || [],
      product_name: productData.product_name || "",
      product_price: info.price ?? "",
      product_quantity: info.quantity ?? "",
      product_category: info.category ?? "",
      product_description: info.description ?? "",
    });

    // map existing images (assume productData.product_images is array of URLs or objects with url)
    const existingImages = (productData.product_images || []).map(
      (img, idx) => {
        const url = typeof img === "string" ? img : img?.url || "";
        return { id: `existing-${idx}`, url, isNew: false };
      }
    );
    setImages(existingImages);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productData]);

  useEffect(() => {
    // initial fetch
    if (product_id) fetchSingleProduct(product_id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const addImage = (imgObj) => {
    setImages((prev) => [...prev, imgObj]);
  };

  const removeImage = (index) => {
    setImages((prev) => {
      const removed = prev[index];
      // revoke object URL if it was created from a File
      if (removed?.isNew && removed.url && removed.url.startsWith("blob:")) {
        try {
          URL.revokeObjectURL(removed.url);
        } catch (e) {}
      }
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    for (let f of files) {
      if (f.size > MAX_IMAGE_SIZE) {
        showMessage(`Image "${f.name}" must be less than 1 MB.`, false);
        continue;
      }
      const objectUrl = URL.createObjectURL(f);
      addImage({ file: f, url: objectUrl, isNew: true });
    }
    // reset input value so same file can be chosen again if needed
    e.target.value = "";
  };

  const checkValidation = () => {
    if (!images || images.length === 0) {
      showMessage("Product Images Required", false);
      return false;
    } else if (!product.product_name || product.product_name.trim() === "") {
      showMessage("Product Name Is Required", false);
      return false;
    } else if (
      product.product_price === "" ||
      product.product_price === null ||
      isNaN(Number(product.product_price))
    ) {
      showMessage("Product Price Is Required and must be a number", false);
      return false;
    } else if (
      product.product_quantity === "" ||
      product.product_quantity === null ||
      isNaN(Number(product.product_quantity))
    ) {
      showMessage("Product Quantity Is Required and must be a number", false);
      return false;
    } else if (!product.product_category || product.product_category === "") {
      showMessage("Product Category Is Required", false);
      return false;
    } else if (
      !product.product_description ||
      product.product_description.trim() === ""
    ) {
      showMessage("Product Description Is Required", false);
      return false;
    }
    return true;
  };

  const handleAddproduct = async () => {
    if (!checkValidation()) return;
    if (!submitFn || typeof submitFn !== "function") {
      showMessage(
        "Submit function not found on API hook. Update component to call correct function.",
        false
      );
      return;
    }

    const formData = new FormData();

    // Append only new files
    images.forEach((img) => {
      if (img.isNew && img.file) {
        formData.append("files", img.file);
      }
    });

    // Send existing image URLs so backend can keep them
    const existingImageUrls = images
      .filter((img) => !img.isNew && img.url)
      .map((img) => img.url);
    formData.append("existing_images", JSON.stringify(existingImageUrls));

    formData.append("product_name", product.product_name);
    const productInfo = {
      price: product.product_price,
      quantity: product.product_quantity,
      category: product.product_category,
      description: product.product_description,
    };
    formData.append("product_info", JSON.stringify(productInfo));

    try {
      // Call the submit function. Adapt arguments if your API expects product_id first.
      // We'll attempt two common signatures:
      // 1) updateProduct(product_id, formData, showMessage, navigate)
      // 2) updateProduct(formData, showMessage, navigate, product_id)
      let result;
      try {
        // try with product_id first
        result = await submitFn(product_id, formData, showMessage, navigate);
      } catch (err) {
        // fallback: try calling without product_id first
        result = await submitFn(formData, showMessage, navigate, product_id);
      }

      // interpret success (adapt if your API returns other shapes)
      const success =
        result === true ||
        (result && typeof result === "object" && result.success === true);

      if (success) {
        showMessage("Product updated successfully.", true);
        // clean up object URLs for newly added images
        images.forEach((img) => {
          if (img.isNew && img.url && img.url.startsWith("blob:")) {
            try {
              URL.revokeObjectURL(img.url);
            } catch (e) {}
          }
        });
        // navigate or reset as desired (we'll navigate back to product list)
        navigate("/admin/products");
      } else {
        // If API already used showMessage internally you may see duplicates;
        // this is a fallback.
        showMessage("Failed to update product. Please try again.", false);
      }
    } catch (err) {
      showMessage("An error occurred while updating the product.", false);
    }
  };

  return (
    <section className="form-container">
      <h2>Edit/Update Current Product</h2>
      <div className="form-group">
        <label ref={msgRef} id="msg"></label>
      </div>

      <div className="form-group">
        <label className="file-input" htmlFor="files">
          Select product images
        </label>
        <input
          type="file"
          id="files"
          accept="image/*"
          hidden={false}
          multiple={true}
          onChange={handleFileChange}
        />
      </div>

      {images?.length > 0 && (
        <div className="form-group flex-container">
          {images.map((img, index) => (
            <div key={img.id ?? index} className="box">
              <img src={img.url} alt={`Product ${index}`} />
              <span
                role="button"
                tabIndex={0}
                onClick={() => removeImage(index)}
                onKeyPress={() => removeImage(index)}
                style={{ cursor: "pointer" }}
                aria-label={`Remove image ${index + 1}`}
              >
                x
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="product_name">Product Name</label>
        <input
          type="text"
          id="product_name"
          name="product_name"
          onChange={handleChange}
          value={product.product_name}
          placeholder="Enter product name"
        />
      </div>

      <div className="form-group">
        <label htmlFor="product_price">Price</label>
        <input
          onChange={handleChange}
          value={product.product_price}
          type="number"
          id="product_price"
          name="product_price"
          placeholder="Enter price"
          step="0.01"
        />
      </div>

      <div className="form-group">
        <label htmlFor="product_stock">Stock And Quantity</label>
        <input
          onChange={handleChange}
          value={product.product_quantity}
          type="number"
          id="product_stock"
          name="product_quantity"
          placeholder="Enter stock quantity"
        />
      </div>

      <div className="form-group">
        <label htmlFor="product_category">Category</label>
        <select
          id="product_category"
          name="product_category"
          onChange={handleChange}
          value={product.product_category}
        >
          <option value="">Select category</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="accessories">Accessories</option>
          <option value="home">Home & Garden</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="product_description">Description</label>
        <textarea
          onChange={handleChange}
          value={product.product_description}
          id="product_description"
          name="product_description"
          placeholder="Enter product description"
        ></textarea>
      </div>

      <div className="form-group">
        <button
          onClick={handleAddproduct}
          type="button"
          disabled={isAddingProduct}
        >
          {isAddingProduct ? "Please Wait..." : "Update Product"}
        </button>
      </div>
    </section>
  );
};

export default Editproduct;
