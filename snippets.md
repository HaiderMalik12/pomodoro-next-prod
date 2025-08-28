### Two FA HTML & CSS

```jsx
<div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
  <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 space-y-6">
    {/* Header */}
    <div className="text-center">
      <h2 className="text-2xl font-semibold text-gray-800">
        Two-Factor Authentication
      </h2>
      <p className="text-sm text-gray-500 mt-2">
        Secure your account by enabling 2FA.
      </p>
    </div>

    {/* Enable 2FA Button */}
    <div className="flex justify-center">
      <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-xl shadow transition">
        Enable 2FA
      </button>
    </div>

    {/* Show QR Button */}
    <div className="flex justify-center">
      <button className="w-full border border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-medium py-2 px-4 rounded-xl shadow-sm transition">
        Show QR Code
      </button>
    </div>

    {/* QR Code Display */}
    <div className="flex justify-center">
      <div className="w-40 h-40 bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center rounded-xl">
        <span className="text-gray-400 text-sm">QR Code Here</span>
      </div>
    </div>

    {/* Input Field */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Enter 2FA Code
      </label>
      <input
        type="text"
        placeholder="123456"
        className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
      />
    </div>

    {/* Confirm Button */}
    <div className="flex justify-center">
      <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-xl shadow transition">
        Confirm Code
      </button>
    </div>
  </div>
</div>
```
