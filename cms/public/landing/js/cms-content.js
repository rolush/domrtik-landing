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

  const paragraphs = (container, value) => {
    if (!container || !value) return
    container.replaceChildren(...value.split("\n").filter(Boolean).map((line) => {
      const paragraph = document.createElement("p")
      paragraph.textContent = line
      return paragraph
    }))
  }

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

    text(".footer__col--contacts .contact:first-child .contact__value", settings.address)
    document.querySelectorAll(".schedule__item").forEach((row, index) => {
      const item = settings.schedule?.[index]
      if (!item) return
      row.querySelector(".schedule__day").textContent = item.days
      row.querySelector(".schedule__time").textContent = item.time
    })
    const socialURLs = [settings.vkUrl, settings.okUrl, settings.rutubeUrl]
    document.querySelectorAll(".socials__link").forEach((link, index) => {
      if (socialURLs[index]) link.href = socialURLs[index]
    })
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

    if (page.benefits?.length) {
      document.querySelectorAll(".benefit").forEach((card, index) => {
        const benefit = page.benefits[index]
        card.hidden = !benefit
        if (!benefit) return
        card.querySelector(".benefit__chip").textContent = benefit.chip
        card.querySelector(".benefit__label").textContent = benefit.label
        const value = card.querySelector(".benefit__value")
        value.replaceChildren()
        if (benefit.prefix) {
          const prefix = document.createElement("span")
          prefix.className = "benefit__value-unit"
          prefix.textContent = `${benefit.prefix} `
          value.append(prefix)
        }
        const number = document.createElement("span")
        number.className = "benefit__value-num"
        number.textContent = benefit.value
        value.append(number)
        if (benefit.suffix) {
          const suffix = document.createElement("span")
          suffix.className = benefit.suffix === "%" ? "benefit__value-pct" : "benefit__value-unit"
          suffix.textContent = ` ${benefit.suffix}`
          value.append(suffix)
        }
      })
    }

    if (page.reasons?.length) {
      document.querySelectorAll(".reason:not(.reason--cta)").forEach((card, index) => {
        const reason = page.reasons[index]
        card.hidden = !reason
        if (!reason) return
        card.querySelector(".reason__name").textContent = reason.title
        card.querySelector(".reason__text").textContent = reason.description
      })
    }
    text(".reason__offer", page.reasonsCallToAction?.text)
    text(".reason__btn", page.reasonsCallToAction?.buttonLabel)

    const assortment = page.assortmentCallToAction || {}
    text(".cta--assortment .cta__title-line:first-child", assortment.titleStart)
    if (assortment.titleStart && assortment.titleAccent) {
      const firstLine = document.querySelector(".cta--assortment .cta__title-line:first-child")
      const accent = document.createElement("span")
      accent.className = "cta__title-accent"
      accent.textContent = assortment.titleAccent
      firstLine.append(" ", accent)
    }
    text(".cta--assortment .cta__title-line:last-child", assortment.titleEnd)
    text(".cta--assortment .cta__note-text", assortment.note)
    text(".cta--assortment .form__btn", assortment.buttonLabel)
    setImage(document.querySelector(".cta--assortment .cta__photo"), assortment.image)

    const about = page.about || {}
    text(".about__title", about.title)
    paragraphs(document.querySelector(".about__text"), about.text)
    text(".about__stat--experience .about__stat-value", about.experienceValue)
    text(".about__stat--experience .about__stat-chip", about.experienceLabel)
    text(".about__stat--models .about__stat-value", about.modelsValue)
    text(".about__stat--models .about__stat-chip", about.modelsLabel)
    const video = document.querySelector(".about__video video")
    const poster = mediaURL(about.poster)
    if (poster) video.poster = poster
    const videoURLs = [mediaURL(about.videoWebm), mediaURL(about.videoMp4)]
    let videoChanged = false
    video.querySelectorAll("source").forEach((source, index) => {
      if (!videoURLs[index]) return
      source.src = videoURLs[index]
      videoChanged = true
    })
    if (videoChanged) video.load()

    const delivery = page.delivery || {}
    text(".cta--delivery .cta__headline", delivery.start)
    if (delivery.start) {
      const headline = document.querySelector(".cta--delivery .cta__headline")
      const strong = document.createElement("span")
      strong.className = "cta__headline-strong"
      strong.textContent = delivery.strong || ""
      const amount = document.createElement("span")
      amount.className = "cta__headline-big"
      amount.textContent = delivery.amount || ""
      headline.append(" ", strong, ` ${delivery.middle || ""} `, amount, " ₽")
    }
    text(".cta--delivery .cta__terms-chip", delivery.terms)
    text(".cta--delivery .order-form__btn", delivery.buttonLabel)

    if (page.faq?.length) {
      document.querySelectorAll(".faq__card").forEach((button, index) => {
        const item = page.faq[index]
        button.closest(".faq__item").hidden = !item
        if (!item) return
        button.querySelector(".faq__question").textContent = item.question
        if (!item.answer) return
        const modal = document.getElementById(button.dataset.modalOpen)
        let body = modal?.querySelector(".modal__text")
        if (!body && modal) {
          body = document.createElement("div")
          body.className = "modal__text"
          modal.querySelector(".modal__title").after(body)
        }
        paragraphs(body, item.answer)
      })
    }

    const geography = page.geography || {}
    text(".geography__title-accent", geography.accent)
    if (geography.title) {
      const title = document.querySelector(".geography__title")
      const accent = title.querySelector(".geography__title-accent")
      title.replaceChildren(accent, ` ${geography.title}`)
    }
    text(".geography__note-text", geography.note)
    setImage(document.querySelector(".geography__map-img"), geography.image)

    if (page.certificates?.length) {
      document.querySelectorAll(".gallery__stage img").forEach((image, index) => {
        const certificate = page.certificates[index]
        if (certificate) setImage(image, certificate.image)
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
