const BASE_URL = "http://172.20.10.2:5000"; // change to your IP

const getAllBrands = async () => {
  try {
    const response = await fetch(`${BASE_URL}/brands`);

    if (!response.ok) {
      throw new Error("Failed to fetch brands");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

const getBrandById = async (id: number) => {
  const response = await fetch(`${BASE_URL}/brands${id}`);

  if (!response.ok) throw new Error("Failed to fetch brand");

  return response.json();
};

const getAllItems = async () => {
  try {
    const response = await fetch(`${BASE_URL}/items`);

    if (!response.ok) {
      throw new Error("Failed to fetch brands");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

const getItemsByBrand = async (brandId: number) => {
  const url = `${BASE_URL}/items?createdBy=${brandId}`;
  // console.log("Full URL:", url); // 👈 paste this in your browser
  try {
    const response = await fetch(url);
    // console.log("Status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.log("Error body:", errorText); // 👈 see what server returns
      throw new Error(`${response.status}: ${errorText}`);
    }

    const data = await response.json();
    // console.log("Data:", data); // 👈 see the actual response shape
    return data;
  } catch (err) {
    console.error("Raw fetch error:", err); // 👈 full error, not just message
    throw err;
  }
};

export { getAllBrands, getAllItems, getBrandById, getItemsByBrand };
