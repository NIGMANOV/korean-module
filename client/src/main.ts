import "./style.css";

// Интерфейс Авторизации (запрос)
interface IAuthorization {
  email: string;
  password: string;
  message?: string;
}

// Интерфейс OTP (запрос)
interface IOtp {
  email: string;
  otp: string;
  message?: string;
}

// Интерфейс Регистрации (запрос)
interface IRegisterData {
  admin_name: string;
  email: string;
  password: string;
  message?: string;
}

// Интерфейс Локализованных строк (например, для name и description)
interface ILocalizedString {
  en: string;
  fr: string;
}

// Интерфейс веса
interface IWeight {
  gross: number;
  net: number;
  unit: string;
}

// Интерфейс контактов компании (owner, contact)
interface ICompanyContact {
  name: string;
  mobileNumber: string;
  email: string;
}

// Интерфейс компании
interface ICompany {
  companyName: string;
  companyAddress: string;
  companyTelephone: string;
  companyEmail: string;
  owner: ICompanyContact;
  contact: ICompanyContact;
}

// Интерфейс продукта
interface IProduct {
  name: ILocalizedString;
  description: ILocalizedString;
  gtin: string;
  brand: string;
  countryOfOrigin: string;
  weight: IWeight;
  company: ICompany;
  imageUrl?: string;
  message?: string;
}

const app = document.querySelector<HTMLDivElement>("#app")!;

function renderLogin() {
  app.innerHTML = `
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <form id="form-authorization" class="bg-white p-8 rounded-xl shadow-md w-full max-w-sm space-y-4">
        <h2 class="text-2xl font-bold text-center text-gray-700">Authorization</h2>
        <div>
          <label for="email" class="block text-sm font-medium text-gray-600">Email</label>
          <input type="email" id="email" class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-600">Password</label>
          <input type="password" id="password" class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
        </div>
        <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200">Sign in</button>
        <p class="text-center text-sm text-gray-500">
          No account?
          <a href="#register" class="text-blue-600 hover:underline">Sign Up</a>
        </p>
        <div id="message" class="text-center text-red-500 text-sm"></div>
      </form>
    </div>
  `;

  const form = document.getElementById("form-authorization") as HTMLFormElement;
  const messageDiv = document.getElementById("message") as HTMLDivElement;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = (
      document.getElementById("email") as HTMLInputElement
    ).value.trim();
    const password = (
      document.getElementById("password") as HTMLInputElement
    ).value.trim();

    if (!email || !password) {
      messageDiv.textContent = "Please fill in all fields.";
      return;
    }

    try {
      const response: Response = await fetch(
        "http://localhost:3000/api/admin/auth",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data: IAuthorization = await response.json();

      if (response.ok) {
        messageDiv.style.color = "green";
        messageDiv.textContent = "Login successful!";
        localStorage.setItem("userEmail", email);
        setTimeout(() => {
          window.location.hash = "#dashboard";
        }, 1000);
      } else {
        messageDiv.style.color = "red";
        messageDiv.textContent = data.message || "Authorization failed.";
      }
    } catch (error) {
      console.error("Ошибка авторизации:", error);
      messageDiv.style.color = "red";
      messageDiv.textContent = "Server error. Try again later.";
    }
  });
}

function renderOtpVerification(email: string) {
  app.innerHTML = `
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <form id="form-otp" class="bg-white p-8 rounded-xl shadow-md w-full max-w-sm space-y-4">
        <h2 class="text-2xl font-bold text-center text-gray-700">Verify OTP</h2>
        <p class="text-center text-gray-600 text-sm">Enter the 6-digit code sent to <b>${email}</b></p>
        <div>
          <label for="otp" class="block text-sm font-medium text-gray-600">OTP Code</label>
          <input type="text" id="otp" maxlength="6" class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
        </div>
        <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200">Verify</button>
        <div id="otp-message" class="text-center text-red-500 text-sm"></div>
      </form>
    </div>
  `;

  const form = document.getElementById("form-otp") as HTMLFormElement;
  const otpInput = document.getElementById("otp") as HTMLInputElement;
  const messageDiv = document.getElementById("otp-message") as HTMLDivElement;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const otp = otpInput.value.trim();

    if (otp.length !== 6) {
      messageDiv.textContent = "OTP must be 6 digits.";
      return;
    }

    try {
      const res: Response = await fetch("http://localhost:3000/api/admin/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data: IOtp = await res.json();

      if (res.ok) {
        messageDiv.style.color = "green";
        messageDiv.textContent = "Verification successful! Redirecting...";
        setTimeout(() => {
          window.location.hash = "#login";
        }, 1500);
      } else {
        messageDiv.textContent = data.message || "Invalid OTP code.";
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      messageDiv.textContent = "Server error. Try again later.";
    }
  });
}

function renderRegister() {
  app.innerHTML = `
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <form id="form-registration" class="bg-white p-8 rounded-xl shadow-md w-full max-w-sm space-y-4">
        <h2 class="text-2xl font-bold text-center text-gray-700">Registration</h2>
        <div>
          <label for="admin_name" class="block text-sm font-medium text-gray-600">Name</label>
          <input type="text" id="admin_name" class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" required>
        </div>
        <div>
          <label for="email" class="block text-sm font-medium text-gray-600">Email</label>
          <input type="email" id="email" class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" required>
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-600">Password</label>
          <input type="password" id="password" class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" required>
        </div>
        <button type="submit" class="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200">Sign up</button>
        <p class="text-center text-sm text-gray-500">
          Do you already have an account?
          <a href="#login" class="text-green-600 hover:underline">Sign in</a>
        </p>
        <div id="message" class="text-center text-red-500 text-sm"></div>
      </form>
    </div>
  `;

  const form = document.getElementById("form-registration") as HTMLFormElement;
  const messageDiv = document.getElementById("message") as HTMLDivElement;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const admin_name = (
      document.getElementById("admin_name") as HTMLInputElement
    ).value.trim();
    const email = (
      document.getElementById("email") as HTMLInputElement
    ).value.trim();
    const password = (
      document.getElementById("password") as HTMLInputElement
    ).value.trim();

    if (!admin_name || !email || !password) {
      messageDiv.textContent = "Please fill in all fields.";
      return;
    }

    try {
      const response: Response = await fetch(
        "http://localhost:3000/api/admin",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ admin_name, email, password }),
        }
      );

      const data: IRegisterData = await response.json();

      if (response.ok) {
        messageDiv.style.color = "green";
        messageDiv.textContent = "Registration successful!";
        setTimeout(() => {
          renderOtpVerification(email);
        }, 1000);
      } else {
        messageDiv.style.color = "red";
        messageDiv.textContent = data.message || "Registration error.";
      }
    } catch (error) {
      console.error("Registration error:", error);
      messageDiv.style.color = "red";
      messageDiv.textContent = "Server error. Try again later.";
    }
  });
}

function renderDashboard(userEmail: string) {
  app.innerHTML = `
    <div class="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <h1 class="text-3xl font-bold mb-4 text-gray-700">Welcome, ${userEmail}!</h1>
      <p class="mb-6 text-gray-600">This is your main dashboard page.</p>

      <form id="product-form" class="bg-white p-6 rounded-xl shadow-md w-full max-w-lg space-y-4 mb-8" enctype="multipart/form-data">
        <h2 class="text-xl font-bold text-gray-700">Create Product</h2>
        <input type="text" id="gtin" placeholder="GTIN" required class="w-full border p-2 rounded" />
        <input type="text" id="brand" placeholder="Brand" required class="w-full border p-2 rounded" />
        <input type="text" id="country" placeholder="Country of Origin" required class="w-full border p-2 rounded" />
        <input type="text" id="name-en" placeholder="Name (EN)" required class="w-full border p-2 rounded" />
        <input type="text" id="name-fr" placeholder="Name (FR)" required class="w-full border p-2 rounded" />
        <textarea id="desc-en" placeholder="Description (EN)" required class="w-full border p-2 rounded"></textarea>
        <textarea id="desc-fr" placeholder="Description (FR)" required class="w-full border p-2 rounded"></textarea>
        <input type="number" id="gross" placeholder="Weight Gross" required class="w-full border p-2 rounded" />
        <input type="number" id="net" placeholder="Weight Net" required class="w-full border p-2 rounded" />
        <input type="text" id="unit" placeholder="Weight Unit" required class="w-full border p-2 rounded" />
        <input type="file" id="image" accept="image/*" class="w-full border p-2 rounded" />
        <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md">Add Product</button>
        <div id="product-message" class="text-center text-sm"></div>
      </form>

      <div class="w-full max-w-3xl">
        <h2 class="text-2xl font-bold text-gray-700 mb-4">All Products</h2>
        <div id="product-list" class="space-y-4"></div>
      </div>

      <button id="logout-btn" class="mt-8 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-md transition duration-200">
        Logout
      </button>
    </div>
  `;

  const logoutBtn = document.getElementById("logout-btn") as HTMLButtonElement;
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("userEmail");
    window.location.hash = "#login";
  });

  const form = document.getElementById("product-form") as HTMLFormElement;
  const message = document.getElementById("product-message") as HTMLDivElement;
  const list = document.getElementById("product-list") as HTMLDivElement;

  async function loadProducts() {
    try {
      const res: Response = await fetch("http://localhost:3000/api/products/");
      const products: IProduct[] = await res.json();

      list.innerHTML = products
        .map((product: IProduct) => {
          const owner = product.company?.owner || {};
          const contact = product.company?.contact || {};
          const company = product.company || {};
          // Картинка продукта, если есть
          const imageTag = product.imageUrl
            ? `<img src="http://localhost:3000${product.imageUrl}" alt="product image" class="max-w-xs mb-2 rounded" />`
            : "";

          return `
            <div class="bg-white p-4 shadow rounded-md border">
              ${imageTag}
              <h3 class="text-lg font-bold text-gray-800">${
                product.name?.en || "No name"
              } / ${product.name?.fr || ""}</h3>
              <p class="text-gray-600 text-sm">${
                product.description?.en || "No description"
              }</p>
              <div class="text-xs text-gray-500 mt-2">GTIN: ${
                product.gtin
              }, Brand: ${product.brand}</div>
              
              <div class="mt-4 text-sm text-gray-700 border-t pt-3">
                <p class="font-semibold">Company Info</p>
                <p>Name: ${company.companyName || "-"}</p>
                <p>Address: ${company.companyAddress || "-"}</p>
                <p>Email: ${company.companyEmail || "-"}</p>
                <p>Phone: ${company.companyTelephone || "-"}</p>
  
                <div class="mt-2">
                  <p class="font-semibold">Owner:</p>
                  <p>Name: ${owner.name || "-"}</p>
                  <p>Mobile: ${owner.mobileNumber || "-"}</p>
                  <p>Email: ${owner.email || "-"}</p>
                </div>
  
                <div class="mt-2">
                  <p class="font-semibold">Contact:</p>
                  <p>Name: ${contact.name || "-"}</p>
                  <p>Mobile: ${contact.mobileNumber || "-"}</p>
                  <p>Email: ${contact.email || "-"}</p>
                </div>
              </div>
            </div>
          `;
        })
        .join("");
    } catch (err) {
      list.innerHTML = `<p class="text-red-500">Failed to load products</p>`;
    }
  }

  loadProducts();

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const imageInput = document.getElementById("image") as HTMLInputElement;
    const file = imageInput.files?.[0];

    // Формируем объект FormData
    const formData = new FormData();

    // Оборачиваем name и description в JSON строки для передачи вложенных объектов
    const nameObj = {
      en: (document.getElementById("name-en") as HTMLInputElement).value.trim(),
      fr: (document.getElementById("name-fr") as HTMLInputElement).value.trim(),
    };
    const descriptionObj = {
      en: (
        document.getElementById("desc-en") as HTMLTextAreaElement
      ).value.trim(),
      fr: (
        document.getElementById("desc-fr") as HTMLTextAreaElement
      ).value.trim(),
    };
    const weightObj = {
      gross: parseFloat(
        (document.getElementById("gross") as HTMLInputElement).value
      ),
      net: parseFloat(
        (document.getElementById("net") as HTMLInputElement).value
      ),
      unit: (document.getElementById("unit") as HTMLInputElement).value.trim(),
    };

    formData.append(
      "gtin",
      (document.getElementById("gtin") as HTMLInputElement).value.trim()
    );
    formData.append(
      "brand",
      (document.getElementById("brand") as HTMLInputElement).value.trim()
    );
    formData.append(
      "countryOfOrigin",
      (document.getElementById("country") as HTMLInputElement).value.trim()
    );

    formData.append("name", JSON.stringify(nameObj));
    formData.append("description", JSON.stringify(descriptionObj));
    formData.append("weight", JSON.stringify(weightObj));

    // Можно сделать company как в примере (если нужно)
    const companyObj = {
      companyName: "Default Company",
      companyAddress: "Default Address",
      companyTelephone: "+00 000 000 000",
      companyEmail: "example@example.com",
      owner: {
        name: "Owner Name",
        mobileNumber: "+00 111 111 111",
        email: "owner@example.com",
      },
      contact: {
        name: "Contact Name",
        mobileNumber: "+00 222 222 222",
        email: "contact@example.com",
      },
    };
    formData.append("company", JSON.stringify(companyObj));

    if (file) {
      formData.append("image", file);
    }

    try {
      const res = await fetch("http://localhost:3000/api/products/", {
        method: "POST",
        body: formData, // Content-Type не ставим, браузер выставит multipart/form-data
      });

      const data = await res.json();

      if (res.ok) {
        message.style.color = "green";
        message.textContent = "Product created!";
        form.reset();
        loadProducts();
      } else {
        message.style.color = "red";
        message.textContent = data.message || "Creation failed.";
      }
    } catch (error) {
      console.error("Error:", error);
      message.style.color = "red";
      message.textContent = "Server error.";
    }
  });
}

function renderNotFound() {
  app.innerHTML = `
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="bg-white p-10 rounded-xl shadow-md text-center max-w-md">
        <h1 class="text-[8rem] font-extrabold text-blue-600 opacity-70 mb-4 select-none">404</h1>
        <p class="text-lg text-gray-700 mb-4">Page Not Found</p>
        <p class="text-sm text-gray-500 mb-6">Sorry, we couldn’t find the page you’re looking for.</p>
        <a href="#login" class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200">
          Go to Login
        </a>
      </div>
    </div>
  `;
}

function router() {
  const hash = window.location.hash;
  if (hash === "#register") {
    renderRegister();
  } else if (hash === "#dashboard") {
    const savedEmail = localStorage.getItem("userEmail");
    if (savedEmail) {
      renderDashboard(savedEmail);
    } else {
      window.location.hash = "#login";
    }
  } else if (hash === "#login" || hash === "" || hash === "#") {
    renderLogin();
  } else {
    renderNotFound();
  }
}

window.addEventListener("hashchange", router);
router();
