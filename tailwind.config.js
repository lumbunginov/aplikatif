module.exports = {
  content: ["./index.html", "./contoh-aplikasi/**/*.html"],
  theme: {
    extend: {
      colors: {
        brand: {
          indigo: '#4F46E5',
          emerald: '#10B981',
          dark: '#1E293B',
          light: '#F9FAFB',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    }
  }
}
