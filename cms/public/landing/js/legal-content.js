(() => {
  const page = location.pathname.endsWith("privacy.html") ? "privacy" : "consent"
  const title = document.querySelector(".legal__title")
  const content = document.querySelector(".legal__text")

  fetch("/api/globals/legal-pages")
    .then((response) => response.ok ? response.json() : Promise.reject(response))
    .then((data) => {
      const pageTitle = data[`${page}Title`]
      const pageHTML = data[`${page}HTML`]
      if (title && pageTitle) title.textContent = pageTitle
      if (content && pageHTML) content.innerHTML = pageHTML
    })
    .catch((error) => console.error("DOMTRIK legal content was not loaded", error))
})()
