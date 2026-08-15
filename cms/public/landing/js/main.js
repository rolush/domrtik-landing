document.addEventListener("click", (event) => {
  const link = event.target.closest('a[href^="#"]');
  if (!link) return;

  const id = link.getAttribute("href");
  if (id.length < 2) return;

  const target = document.querySelector(id);
  if (!target) return;

  event.preventDefault();
  target.scrollIntoView({ behavior: "smooth", block: "start" });
});

/* Модальные окна */

const modals = (() => {
  let opener = null;

  const open = (id) => {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.hidden = false;
    // кадр задержки, иначе переход от hidden к видимому состоянию не анимируется
    requestAnimationFrame(() => modal.classList.add("is-open"));
    document.body.classList.add("is-modal-open");
    const focusable = modal.querySelector("input, button, a[href]");
    if (focusable) focusable.focus();
  };

  const close = (modal) => {
    modal.classList.remove("is-open");

    const finish = () => {
      modal.hidden = true;
      if (!document.querySelector(".modal:not([hidden])")) {
        document.body.classList.remove("is-modal-open");
      }
    };

    modal.dispatchEvent(new CustomEvent("modal:closed"));

    const duration = parseFloat(getComputedStyle(modal).transitionDuration) * 1000;
    if (duration > 0) {
      setTimeout(finish, duration);
    } else {
      finish();
    }

    if (opener) {
      opener.focus();
      opener = null;
    }
  };

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-modal-open]");
    if (trigger) {
      event.preventDefault();
      opener = trigger;
      open(trigger.dataset.modalOpen);
      return;
    }

    const closer = event.target.closest("[data-modal-close]");
    if (closer) {
      const modal = closer.closest(".modal");
      if (modal) close(modal);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    const modal = document.querySelector(".modal:not([hidden])");
    if (modal) close(modal);
  });

  return { open, close };
})();

/* Меню-бургер на телефоне */

(() => {
  const header = document.querySelector(".header");
  const burger = document.querySelector(".burger");
  if (!header || !burger) return;

  const setOpen = (open) => {
    header.classList.toggle("header--open", open);
    burger.setAttribute("aria-expanded", String(open));
  };

  burger.addEventListener("click", () => setOpen(!header.classList.contains("header--open")));

  // ушли по ссылке — меню больше не нужно
  header.querySelectorAll(".nav__link, .header__email, .phones__item").forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });

  header.querySelectorAll("[data-modal-open]").forEach((button) => {
    button.addEventListener("click", () => setOpen(false));
  });

  document.addEventListener("click", (event) => {
    if (!header.contains(event.target)) setOpen(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setOpen(false);
  });
})();

/* Видео в блоке «О компании» */

(() => {
  const video = document.querySelector(".about__video video");
  const play = document.querySelector(".about__play");
  if (!video || !play) return;

  const toggle = () => {
    if (!video.paused) {
      video.pause();
      return;
    }
    // в старых браузерах play() ничего не возвращает
    const started = video.play();
    if (started) started.catch(() => {});
  };

  play.addEventListener("click", toggle);
  video.addEventListener("click", toggle);
  video.addEventListener("play", () => play.classList.add("about__play--off"));
  video.addEventListener("pause", () => play.classList.remove("about__play--off"));
})();

/* Галерея сертификатов: наполняется, когда появятся сканы */

document.querySelectorAll("[data-gallery]").forEach((gallery) => {
  const stage = gallery.querySelector(".gallery__stage");
  const slides = Array.from(stage.querySelectorAll("img"));
  if (!slides.length) return;

  gallery.setAttribute("data-gallery-ready", "");
  let index = 0;

  const counter = document.createElement("p");
  counter.className = "gallery__counter";
  gallery.append(counter);

  const render = () => {
    slides.forEach((slide, i) => {
      slide.hidden = i !== index;
    });
    counter.textContent = `${index + 1} из ${slides.length}`;
  };

  const step = (delta) => {
    index = (index + delta + slides.length) % slides.length;
    render();
  };

  gallery.querySelector("[data-gallery-prev]").addEventListener("click", () => step(-1));
  gallery.querySelector("[data-gallery-next]").addEventListener("click", () => step(1));

  document.addEventListener("keydown", (event) => {
    if (gallery.closest(".modal").hidden) return;
    if (event.key === "ArrowLeft") step(-1);
    if (event.key === "ArrowRight") step(1);
  });

  render();
});

/* Плашка MAX: всплывает, когда до блока «С нами работать выгодно» долистали, и дальше держится */

(() => {
  const widget = document.querySelector(".max-widget");
  const anchor = document.querySelector(".hero");
  if (!widget || !anchor) return;

  let ticking = false;

  // нижняя строка подвала: логотип, меню, политика, «Сделано в CADesign»
  const bar = document.querySelector(".footer__bar");
  const GAP = 16;

  const update = () => {
    ticking = false;
    const passed = anchor.getBoundingClientRect().bottom <= 0;
    widget.classList.toggle("is-visible", passed);

    if (!bar) return;
    // у самого низа страницы плашка ложится на подвал — приподнимаем ровно
    // настолько, чтобы её низ встал над этой строкой, и не больше
    const offset = parseFloat(getComputedStyle(widget).bottom) || 0;
    const restingBottom = window.innerHeight - offset;
    const lift = restingBottom + GAP - bar.getBoundingClientRect().top;
    widget.style.setProperty("--lift", `${Math.max(0, lift)}px`);
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  update();
})();

/* Валидация форм: заявка в модалке, подбор ассортимента, расчёт заказа, форма в подвале */

(() => {
  // телефон принимаем в любом оформлении: скобки, пробелы и дефисы отбрасываем
  const normalizePhone = (value) => value.replace(/[\s()\-]/g, "");

  const rules = {
    name: {
      test: (value) => value.trim().length >= 2,
      message: "Укажите имя",
    },
    email: {
      test: (value) =>
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/.test(value.trim()),
      message: "Проверьте адрес почты — например, name@mail.ru",
    },
    phone: {
      test: (value) => /^(\+7|8)\d{10}$/.test(normalizePhone(value)),
      message: "Телефон в формате +7 999 123 45 67 или 8 999 123 45 67",
    },
  };

  const AGREE_MESSAGE = "Подтвердите согласие на обработку данных";

  // поле в обёртке — сообщение внутрь неё, под инпут;
  // чекбокс — после его подписи; поле без обёртки — сразу после инпута
  const noteAnchor = (field) => {
    const label = field.closest(".modal-form__agree, .form__agree, .order-form__agree");
    if (label) return { parent: label.parentNode, after: label };
    const wrap = field.closest(".form__field, .order-form__field");
    if (wrap) return { parent: wrap, after: null };
    return { parent: field.parentNode, after: field };
  };

  const findNote = (field) => {
    const { parent, after } = noteAnchor(field);
    if (after) {
      const next = after.nextElementSibling;
      return next && next.classList.contains("field-error") ? next : null;
    }
    return parent.querySelector(":scope > .field-error");
  };

  const clearError = (field) => {
    if (!field || !field.name) return;
    field.classList.remove("is-invalid");
    field.removeAttribute("aria-invalid");
    const note = findNote(field);
    if (note) note.remove();
  };

  const showError = (field, message) => {
    clearError(field);
    field.classList.add("is-invalid");
    field.setAttribute("aria-invalid", "true");
    const note = document.createElement("p");
    note.className = "field-error";
    if (field.type === "checkbox") note.classList.add("field-error--agree");
    note.textContent = message;
    const { parent, after } = noteAnchor(field);
    if (after) after.after(note);
    else parent.append(note);
  };

  const validate = (form) => {
    let firstInvalid = null;

    Object.entries(rules).forEach(([name, rule]) => {
      const field = form.elements[name];
      if (!field) return;
      if (rule.test(field.value)) {
        clearError(field);
      } else {
        showError(field, rule.message);
        firstInvalid = firstInvalid || field;
      }
    });

    const agree = form.elements.agree;
    if (agree) {
      if (agree.checked) {
        clearError(agree);
      } else {
        showError(agree, AGREE_MESSAGE);
        firstInvalid = firstInvalid || agree;
      }
    }

    return firstInvalid;
  };

  const ENDPOINT = "/api/leads/submit";

  const note = (form, text, isError) => {
    form.querySelectorAll(".form-note").forEach((el) => el.remove());
    if (!text) return;
    const el = document.createElement("p");
    el.className = isError ? "form-note form-note--error" : "form-note";
    el.textContent = text;
    form.append(el);
  };

  const showDone = (form) => {
    const done = document.createElement("div");
    done.className = "form-done";
    done.innerHTML =
      '<p class="form-done__title">Заявка отправлена</p>' +
      '<p class="form-done__text">Менеджер свяжется с вами в ближайшее рабочее время ' +
      "и вышлет оптовый прайс.</p>";
    form.replaceWith(done);

    // на экране успеха заголовок окна не нужен — остаётся одно сообщение
    const card = done.closest(".modal__card");
    if (card) card.classList.add("modal__card--done");

    // окно закрыли — возвращаем чистую форму, иначе при следующем открытии её не будет
    const modal = done.closest(".modal");
    if (modal) {
      modal.addEventListener(
        "modal:closed",
        () => {
          if (card) card.classList.remove("modal__card--done");
          done.replaceWith(form);
          form.reset();
          note(form, "");
          form.querySelectorAll(".field-error").forEach((el) => el.remove());
          form.querySelectorAll(".is-invalid").forEach((el) => el.classList.remove("is-invalid"));
        },
        { once: true }
      );
    }
  };

  /*
   * Скрытая капча Яндекс SmartCaptcha, расширенный (программный) метод.
   *
   * Виджет невидим: посетитель ничего не заполняет, проверка идёт при отправке.
   * Окно с заданием всплывает, только если запрос показался Яндексу подозрительным.
   *
   * Ключ клиента вписывается здесь, парный ключ сервера — в config.php на хостинге.
   * Пока стоит заглушка: капча выключена, формы работают как раньше. Как только
   * сюда попадёт настоящий ключ (он начинается с «ysc1_»), проверка включится сама.
   */
  const CAPTCHA_SITEKEY = "ВСТАВЬТЕ_КЛЮЧ_КЛИЕНТА";

  const captcha = (() => {
    const enabled = CAPTCHA_SITEKEY.startsWith("ysc1_");
    const widgets = new WeakMap();

    const FAILED = "Не удалось проверить, что вы не робот. Попробуйте ещё раз.";

    // скрипт капчи подключён с defer, к первой отправке он обычно уже загружен
    const ready = () =>
      new Promise((resolve) => {
        if (window.smartCaptcha) {
          resolve(true);
          return;
        }
        let attemptsLeft = 60;
        const timer = setInterval(() => {
          if (window.smartCaptcha || --attemptsLeft <= 0) {
            clearInterval(timer);
            resolve(Boolean(window.smartCaptcha));
          }
        }, 100);
      });

    const widgetFor = (form) => {
      const known = widgets.get(form);
      if (known) return known;

      // виджет живёт вне формы: пустой контейнер внутри неё занимал бы отступ
      // в колонке и раздвигал вёрстку на 16–24px даже с невидимой капчей
      const box = document.createElement("div");
      box.className = "captcha-host";
      document.body.append(box);

      const entry = { id: null, pending: null };
      const finish = (result) => {
        const resolve = entry.pending;
        entry.pending = null;
        if (resolve) resolve(result);
      };

      entry.id = window.smartCaptcha.render(box, {
        sitekey: CAPTCHA_SITEKEY,
        invisible: true,
        hideShield: true,
        hl: "ru",
        callback: (token) => finish({ ok: true, token }),
      });

      // окно задания закрыли, не решив — отправку не продолжаем
      window.smartCaptcha.subscribe(entry.id, "challenge-hidden", () =>
        finish({ ok: false, error: FAILED })
      );
      window.smartCaptcha.subscribe(entry.id, "network-error", () =>
        finish({ ok: false, error: "Проверка не прошла из-за связи. Попробуйте ещё раз." })
      );
      window.smartCaptcha.subscribe(entry.id, "javascript-error", () =>
        finish({ ok: false, error: FAILED })
      );

      widgets.set(form, entry);
      return entry;
    };

    /**
     * Возвращает токен для формы. Если капча не настроена или не загрузилась,
     * отдаёт пустой токен: форма важнее капчи, терять заявки из-за неё нельзя.
     */
    // строка про защиту показывается, только когда капча действительно работает
    if (enabled) {
      document
        .querySelectorAll(".form__captcha-note")
        .forEach((el) => el.removeAttribute("hidden"));
    }

    const check = async (form) => {
      if (!enabled) return { ok: true, token: "" };
      if (!(await ready())) return { ok: true, token: "" };

      const entry = widgetFor(form);
      if (!entry) return { ok: true, token: "" };

      return new Promise((resolve) => {
        entry.pending = resolve;
        // без сброса вторая отправка подряд вернёт старый, уже потраченный токен
        window.smartCaptcha.reset(entry.id);
        window.smartCaptcha.execute(entry.id);
      });
    };

    return { enabled, check };
  })();

  /*
   * Заглушка на время демонстрации.
   *
   * На GitHub Pages и при открытии файла с диска PHP не выполняется, отправлять
   * заявку некуда. В этих двух случаях форма проходит валидацию и показывает экран
   * «Заявка отправлена», ничего никуда не посылая — чтобы можно было показать
   * поведение форм заказчику.
   *
   * Проверка идёт по адресу, а не по флагу: на реальном хостинге она не сработает
   * сама собой, и заявка уйдёт через send.php. Забыть переключить режим нельзя.
   */
  const isDemo =
    window.location.protocol === "file:" || window.location.hostname.endsWith("github.io");

  const submit = async (form) => {
    const button = form.querySelector("button[type=submit]");
    const label = button ? button.textContent : "";
    if (button) {
      button.disabled = true;
      button.textContent = "Отправляем…";
    }
    note(form, "");

    const passed = await captcha.check(form);
    if (!passed.ok) {
      note(form, passed.error, true);
      if (button) {
        button.disabled = false;
        button.textContent = label;
      }
      return;
    }

    const data = new FormData(form);
    data.set("source", form.dataset.formSource || "Форма на сайте");
    data.set("ts", String(openedAt));
    data.set("smart-token", passed.token);

    if (isDemo) {
      // небольшая пауза, иначе экран успеха появляется рывком и выглядит ненастоящим
      await new Promise((resolve) => setTimeout(resolve, 600));
      console.info(
        "DOMTRIK: демонстрационный режим — письмо не отправлено. Заявка «%s»: %s",
        data.get("source"),
        [data.get("name"), data.get("phone"), data.get("email")].join(", ")
      );
      showDone(form);
      if (button) {
        button.disabled = false;
        button.textContent = label;
      }
      return;
    }

    try {
      const response = await fetch(ENDPOINT, { method: "POST", body: data });
      const result = await response.json().catch(() => ({}));

      if (result.ok) {
        showDone(form);
        return;
      }

      Object.entries(result.fields || {}).forEach(([name, message]) => {
        if (form.elements[name]) showError(form.elements[name], message);
      });
      note(form, result.error || "Не удалось отправить заявку, попробуйте ещё раз.", true);
    } catch (error) {
      note(form, "Нет связи с сервером. Проверьте интернет и попробуйте ещё раз.", true);
    } finally {
      if (button) {
        button.disabled = false;
        button.textContent = label;
      }
    }
  };

  // время открытия страницы — сервер по нему отсекает мгновенные отправки ботами
  const openedAt = Date.now();

  document.querySelectorAll(".modal-form, .form, .order-form").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const firstInvalid = validate(form);
      if (firstInvalid) {
        firstInvalid.focus();
        return;
      }
      form.dispatchEvent(new CustomEvent("form:valid", { bubbles: true }));
      submit(form);
    });

    form.addEventListener("input", (event) => clearError(event.target));
    form.addEventListener("change", (event) => clearError(event.target));
  });
})();
