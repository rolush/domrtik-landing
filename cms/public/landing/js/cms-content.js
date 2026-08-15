(() => {
  const text = (selector, value) => {
    const element = document.querySelector(selector)
    if (element && value) element.textContent = value
  }

  const mediaURL = (media) => (media && typeof media === "object" ? media.url : null)

  const setImage = (image, media) => {
    const url = mediaURL(media)
    if (!image || !url) return
    image.src = url
    image.removeAttribute("srcset")
    image.removeAttribute("sizes")
    if (media.alt) image.alt = media.alt
  }

  const phoneHref = (phone) => `tel:${phone.replace(/\D/g, "")}`

  const applySettings = (settings) => {
    if (settings.email) {
      document.querySelectorAll('[href^="mailto:"]').forEach((link) => {
        link.href = `mailto:${settings.email}`
        const label = link.querySelector(".header__email-text") || link
        label.textContent = settings.email
      })
    }

    const phones = [settings.phonePrimary, settings.phoneSecondary].filter(Boolean)
    document.querySelectorAll(".phones__item").forEach((link, index) => {
      if (!phones[index]) return
      link.href = phoneHref(phones[index])
      link.querySelector(".phones__text").textContent = phones[index]
    })
    document.querySelectorAll('.contact__value[href^="tel:"]').forEach((link, index) => {
      if (!phones[index]) return
      link.href = phoneHref(phones[index])
      link.textContent = phones[index]
    })

    if (settings.maxUrl) {
      document.querySelectorAll(".call-btn, .max-widget__pill").forEach((link) => {
        link.href = settings.maxUrl
      })
    }
  }

  const applyHomePage = (page) => {
    const hero = page.hero || {}
    text(".hero__title-line:first-child .hero__title-accent", hero.accentFirst)
    text(".hero__title-line:first-child .hero__title-light", hero.lightFirst)
    text(".hero__title-line--underlined .hero__title-accent", hero.accentSecond)
    text(".hero__title-line--last .hero__title-light", hero.lightThird)
    text(".hero__subtitle", hero.subtitle)
    text(".hero__cta", hero.buttonLabel)
    text(".side-btn__text", hero.sideButtonLabel)
    document.querySelectorAll(".badge__text").forEach((element, index) => {
      if (hero.badges?.[index]?.text) element.textContent = hero.badges[index].text
    })
    document.querySelectorAll(".hero__media-img").forEach((image) => setImage(image, hero.image))

    if (page.categories?.length) {
      document.querySelectorAll(".product").forEach((card, index) => {
        const category = page.categories[index]
        card.hidden = !category
        if (!category) return
        card.querySelector(".product__label").textContent = category.title
        setImage(card.querySelector(".product__img"), category.image)
      })
    }

    if (page.hits?.length) {
      document.querySelectorAll(".hit").forEach((card, index) => {
        const hit = page.hits[index]
        card.hidden = !hit
        if (!hit) return
        card.querySelector(".hit__name").textContent = hit.name
        card.querySelector(".hit__price-value").textContent = hit.price
        card.querySelector(".hit__color").textContent = hit.color || ""
        card.querySelector(".hit__badge").textContent = hit.badge || ""
        setImage(card.querySelector(".hit__img"), hit.image)
      })
    }
  }

  Promise.all([
    fetch("/api/globals/site-settings").then((response) => response.ok ? response.json() : Promise.reject(response)),
    fetch("/api/globals/home-page?depth=1").then((response) => response.ok ? response.json() : Promise.reject(response)),
  ])
    .then(([settings, page]) => {
      applySettings(settings)
      applyHomePage(page)
    })
    .catch((error) => console.error("DOMTRIK CMS content was not loaded", error))
})()
