import React, { useMemo, useState } from "react";
import { assets, categories } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const MAX_IMAGES = 3; // slots 0-2
const VIDEO_SLOT = 3;

const AddProduct = () => {
  const [files, setFiles] = useState([]); // 0-2-3 images, 3 video
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categoriesSelected, setCategoriesSelected] = useState([]);
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [busy, setBusy] = useState(false);
  const [searchCat, setSearchCat] = useState("");

  const { axios } = useAppContext();

  const toggleCategory = (path) => {
    setCategoriesSelected((prev) =>
      prev.includes(path) ? prev.filter((c) => c !== path) : [...prev, path]
    );
  };

  const removeFileAt = (i) => {
    setFiles((prev) => {
      const next = [...prev];
      next[i] = undefined;
      return next;
    });
  };

  const onPickFile = (index, file) => {
    if (!file) return;
    const isVideoSlot = index === VIDEO_SLOT;
    if (isVideoSlot && !file.type.startsWith("video/")) {
      toast.error("Please select a video file for the video slot.");
      return;
    }
    if (!isVideoSlot && !file.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      return;
    }
    setFiles((prev) => {
      const next = [...prev];
      next[index] = file;
      return next;
    });
  };

  const discountPct = useMemo(() => {
    const p = Number(price);
    const o = Number(offerPrice);
    if (!p || !o || o > p) return null;
    return Math.round(((p - o) / p) * 100);
  }, [price, offerPrice]);

  const filteredCategories = useMemo(() => {
    const q = searchCat.trim().toLowerCase();
    if (!q) return categories;
    return categories.filter(
      (c) => c.path.toLowerCase().includes(q) || c.name?.toLowerCase().includes(q)
    );
  }, [searchCat]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!name.trim()) return toast.error("Product name is required.");
    if (!categoriesSelected.length)
      return toast.error("Select at least one category!");
    if (!price || !offerPrice) return toast.error("Enter both prices.");
    if (Number(offerPrice) > Number(price))
      return toast.error("Offer price cannot be greater than product price.");

    try {
      setBusy(true);

      const productData = {
        name: name.trim(),
        description: description.split("\n").map((l) => l.trim()),
        categories: categoriesSelected,
        price: Number(price),
        offerPrice: Number(offerPrice),
      };

      const formData = new FormData();
      formData.append("productData", JSON.stringify(productData));

      for (let i = 0; i < MAX_IMAGES; i++) {
        if (files[i]) formData.append("images", files[i]);
      }
      if (files[VIDEO_SLOT]) formData.append("video", files[VIDEO_SLOT]);

      const { data } = await axios.post("/api/product/add", formData);

      if (data.success) {
        toast.success(data.message || "Product added!");
        setName("");
        setDescription("");
        setCategoriesSelected([]);
        setPrice("");
        setOfferPrice("");
        setFiles([]);
      } else {
        toast.error(data.message || "Failed to add product");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message || "Something went wrong");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex-1 h-[95vh] overflow-y-auto flex flex-col bg-gray-50">
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-3xl mx-auto bg-white md:my-8 my-4 md:p-8 p-4 rounded-2xl shadow-sm border border-gray-200"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Add product</h2>
            <p className="text-lgtext-gray-500">Upload media, fill the details, and pick categories.</p>
          </div>
          <button
            type="submit"
            disabled={busy}
            className="inline-flex items-center gap-2 rounded-xl bg-[#3f1f0a] px-4 py-2.5 text-lgfont-semibold text-white shadow-sm hover:bg-[#3f1f0a]/90 disabled:opacity-70 cursor-pointer"
          >
            {busy && (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/60 border-t-transparent" />
            )}
            {busy ? "Saving..." : "Save"}
          </button>
        </div>

        {/* Media */}
        <div className="mt-6">
          <label className="block text-base font-medium text-gray-800">
            Product media
          </label>
          <p className="text-lgtext-gray-500">Up to 3 images and 1 video.</p>

          <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3 cursor-pointer">
            {Array(4)
              .fill("")
              .map((_, index) => {
                const file = files[index];
                const isVideo = index === VIDEO_SLOT;
                return (
                  <label
                    key={index}
                    className="relative group aspect-square rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 hover:border-gray-400 transition-colors flex items-center justify-center overflow-hidden"
                  >
                    <input
                      type="file"
                      accept={isVideo ? "video/*" : "image/*"}
                      hidden
                      onChange={(e) => onPickFile(index, e.target.files?.[0])}
                    />
                    {file ? (
                      isVideo ? (
                        <video
                          src={URL.createObjectURL(file)}
                          className="h-full w-full object-cover"
                          controls
                          muted
                        />
                      ) : (
                        <img
                          src={URL.createObjectURL(file)}
                          alt="uploadPreview"
                          className="h-full w-full object-cover"
                        />
                      )
                    ) : (
                      <div className="flex flex-col items-center justify-center text-gray-500 cursor-pointer">
                        <img
                          src={assets.upload_area}
                          alt="uploadArea"
                          className="w-10 h-10 opacity-40 "
                        />
                        <span className="mt-1 text-sm">
                          {isVideo ? "Add video" : "Add image"}
                        </span>
                      </div>
                    )}

                    {file && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          removeFileAt(index);
                        }}
                        className="absolute right-2 top-2 rounded-full bg-black/60 text-white w-7 h-7 text-lggrid place-content-center opacity-90 hover:opacity-100"
                        aria-label="Remove file"
                        title="Remove"
                      >
                        ×
                      </button>
                    )}
                  </label>
                );
              })}
          </div>
        </div>

        {/* Name */}
        <div className="mt-6">
          <label htmlFor="product-name" className="block text-base font-medium text-gray-800">
            Product name
          </label>
          <input
            id="product-name"
            type="text"
            placeholder="e.g., Luxe Rose Gift Box"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-base outline-none focus:border-gray-400 focus:ring-2 focus:ring-[#3f1f0a]/20"
            required
          />
        </div>

        {/* Description */}
        <div className="mt-6">
          <label htmlFor="product-description" className="block text-base font-medium text-gray-800">
            Description
          </label>
          <textarea
            id="product-description"
            rows={4}
            placeholder="Write a few lines about the product..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-base outline-none resize-none focus:border-gray-400 focus:ring-2 focus:ring-[#3f1f0a]/20"
          />
          <div className="mt-1 text-sm text-gray-500">{description.length} characters</div>
        </div>

        {/* Categories */}
        <div className="mt-6">
          <div className="flex items-center justify-between gap-3">
            <label className="block text-base font-medium text-gray-800">
              Select categories
            </label>
            <div className="text-lgtext-gray-500">{categoriesSelected.length} selected</div>
          </div>

          <input
            type="text"
            value={searchCat}
            onChange={(e) => setSearchCat(e.target.value)}
            placeholder="Search categories…"
            className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-base outline-none focus:border-gray-300 focus:ring-2 focus:ring-[#3f1f0a]/20"
          />

          {/* Selected chips */}
          {categoriesSelected.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {categoriesSelected.map((c) => (
                <span
                  key={c}
                  className="inline-flex items-center gap-2 rounded-full border border-[#3f1f0a]/30 bg-[#3f1f0a]/5 px-3 py-1 text-lgtext-[#3f1f0a]"
                >
                  {c}
                  <button
                    type="button"
                    onClick={() => toggleCategory(c)}
                    className="rounded-full bg-[#3f1f0a]/10 px-2 py-0.5 text-sm text-[#3f1f0a] hover:bg-[#3f1f0a]/20 cursor-pointer"
                    aria-label={`Remove ${c}`}
                  >
                    Remove
                  </button>
                </span>
              ))}
            </div>
          )}

          <div className="mt-3 flex flex-wrap gap-2">
            {filteredCategories.map((cat, idx) => {
              const isSelected = categoriesSelected.includes(cat.path);
              return (
                <button
                  key={`${cat.path}-${idx}`}
                  type="button"
                  onClick={() => toggleCategory(cat.path)}
                  className={`px-3 py-2 rounded-full border text-lgfont-medium cursor-pointer transition ${
                    isSelected
                      ? "bg-[#3f1f0a] text-white border-[#3f1f0a]"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {cat.path}
                </button>
              );
            })}
          </div>
        </div>

        {/* Pricing */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="product-price" className="block text-base font-medium text-gray-800">
              Product price
            </label>
            <input
              id="product-price"
              type="number"
              min="0"
              placeholder="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-base outline-none focus:border-gray-400 focus:ring-2 focus:ring-[#3f1f0a]/20"
              required
            />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="offer-price" className="block text-base font-medium text-gray-800">
                Offer price
              </label>
              {discountPct !== null && (
                <span className="text-lgfont-medium text-emerald-600">
                  -{discountPct}% off
                </span>
              )}
            </div>
            <input
              id="offer-price"
              type="number"
              min="0"
              placeholder="0"
              value={offerPrice}
              onChange={(e) => setOfferPrice(e.target.value)}
              className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-base outline-none focus:border-gray-400 focus:ring-2 focus:ring-[#3f1f0a]/20"
              required
            />
          </div>
        </div>

        {/* Footer submit (mobile visible too) */}
        <div className="mt-8 ">
          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-xl bg-[#3f1f0a] px-4 py-3 text-base font-semibold text-white shadow-sm hover:bg-[#3f1f0a]/90 disabled:opacity-70 cursor-pointer"
          >
            {busy ? "Saving..." : "ADD PRODUCT"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
