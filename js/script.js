const keys = [
  { key: "Backquote", en: "`" },
  { key: "Digit1", en: "1" },
  { key: "Digit2", en: "2" },
  { key: "Digit3", en: "3" },
  { key: "Digit4", en: "4" },
  { key: "Digit5", en: "5" },
  { key: "Digit6", en: "6" },
  { key: "Digit7", en: "7" },
  { key: "Digit8", en: "8" },
  { key: "Digit9", en: "9" },
  { key: "Digit0", en: "0" },
  { key: "Minus", en: "-" },
  { key: "Equal", en: "=" },
  { key: "Backspace", en: "backspace", system: true },
  { key: "Home", en: "home", system: true },
  { key: "Tab", en: "tab", system: true },
  { key: "KeyQ", en: "q", ua: "й" },
  { key: "KeyW", en: "w", ua: "ц" },
  { key: "KeyE", en: "e", ua: "у" },
  { key: "KeyR", en: "r", ua: "к" },
  { key: "KeyT", en: "t", ua: "е" },
  { key: "KeyY", en: "y", ua: "н" },
  { key: "KeyU", en: "u", ua: "г" },
  { key: "KeyI", en: "i", ua: "ш" },
  { key: "KeyO", en: "o", ua: "щ" },
  { key: "KeyP", en: "p", ua: "з" },
  { key: "BracketLeft", en: "[", ua: "х" },
  { key: "BracketRight", en: "]", ua: "ї" },
  { key: "Backslash", en: "\\" },
  { key: "Delete", en: "del", system: true },
  { key: "End", en: "end", system: true },
  { key: "CapsLock", en: "caps lock", system: true },
  { key: "KeyA", en: "a", ua: "ф" },
  { key: "KeyS", en: "s", ua: "і" },
  { key: "KeyD", en: "d", ua: "в" },
  { key: "KeyF", en: "f", ua: "а" },
  { key: "KeyG", en: "g", ua: "п" },
  { key: "KeyH", en: "h", ua: "р" },
  { key: "KeyJ", en: "j", ua: "о" },
  { key: "KeyK", en: "k", ua: "л" },
  { key: "KeyL", en: "l", ua: "д" },
  { key: "Semicolon", en: ";", ua: "ж" },
  { key: "Quote", en: "'", ua: "є" },
  { key: "Enter", en: "enter", system: true },
  { key: "PageUp", en: "page up", system: true },
  { key: "ShiftLeft", en: "shift", system: true },
  { key: "KeyZ", en: "z", ua: "я" },
  { key: "KeyX", en: "x", ua: "ч" },
  { key: "KeyC", en: "c", ua: "с" },
  { key: "KeyV", en: "v", ua: "м" },
  { key: "KeyB", en: "b", ua: "и" },
  { key: "KeyN", en: "n", ua: "т" },
  { key: "KeyM", en: "m", ua: "ь" },
  { key: "Comma", en: ",", ua: "б" },
  { key: "Period", en: ".", ua: "ю" },
  { key: "Slash", en: "/", ua: "." },
  { key: "ShiftRight", en: "shift", system: true },
  { key: "ArrowUp", en: "▲" },
  { key: "PageDown", en: "page down", system: true },
  { key: "ControlLeft", en: "ctrl", system: true },
  { key: "MetaLeft", en: "win", system: true },
  { key: "AltLeft", en: "alt", system: true },
  { key: "Space", en: " ", system: true },
  { key: "AltRight", en: "alt", system: true },
  { key: "ControlRight", en: "ctrl", system: true },
  { key: "ArrowLeft", en: "◄" },
  { key: "ArrowDown", en: "▼" },
  { key: "ArrowRight", en: "►" },
];

let languageEn = true;

function renderKeyboard() {
  const keyboardKeys = document.querySelector(".keyboard__keys");
  let keyButton;

  keys.forEach((keyElement) => {
    keyButton = document.createElement("div");
    keyButton.className = "keyboard__key";
    keyButton.setAttribute("id", keyElement.key);
    keyButton.innerHTML = keyElement.en;
    keyboardKeys.append(keyButton);

    if (keyElement.system) keyButton.classList.add("key__system");
  });
}

function changeLang(en = true) {
  let uaKey;
  const keysAll = document.querySelectorAll(".keyboard__key");

  keysAll.forEach((elem) => {
    uaKey = keys.find((item) => item.key === elem.id);

    if (uaKey.ua) {
      en ? (elem.innerHTML = uaKey.en) : (elem.innerHTML = uaKey.ua);
    }
  });
}

function showKeyboard() {
  document.body.innerHTML = `
    <div class="wrapper">
        <div class="keyboard">
            <h1 class="keyboard__title">Virtual Keyboard</h1>
            <textarea class="keyboard__textarea" autofocus></textarea>
            <div class="keyboard__keys"></div>
            <div class="keyboard__text">
                <p>Keyboard designed for Windows OS</p>
                <p>To switch the language, the combination is: <strong>Alt + Shift</strong></p>
            </div>
        </div>
    </div>`;
  renderKeyboard();
}

showKeyboard();

if (localStorage.getItem("language") === "ukraine") {
  languageEn = false;
  changeLang(languageEn);
}

function pressedCapsLock(capsLock = false) {
  const allKeys = document.querySelectorAll(".keyboard__key");

  allKeys.forEach((elem) => {
    capsLock
      ? (elem.innerHTML = elem.innerHTML.toUpperCase())
      : (elem.innerHTML = elem.innerHTML.toLowerCase());
  });
}

function pressedKey(key) {
  if (key.id === "CapsLock") {
    key.classList.toggle("active");
    pressedCapsLock(key.classList.contains("active"));
  } else key.classList.add("active");
}

document.addEventListener("keydown", (event) => {
  const keyboardTextArea = document.querySelector(".keyboard__textarea");
  const key = document.querySelector(`#${event.code}`);

  let { value, selectionStart, selectionEnd } = keyboardTextArea;

  if (!key) return;

  if (key.id === "Tab") {
    event.preventDefault();

    keyboardTextArea.value =
      value.slice(0, selectionStart) + "\t" + value.slice(selectionEnd);

    keyboardTextArea.setSelectionRange(selectionStart + 2, selectionStart + 2);
  }

  keyboardTextArea.focus();
  pressedKey(key);

  if (
    ((event.code === "ShiftLeft" || event.code === "ShiftRight") && event.altKey) ||
    ((event.code === "AltLeft" || event.code === "AltRight") && event.shiftKey)
  ) {
    languageEn = !languageEn;
    languageEn
      ? localStorage.setItem("language", "english")
      : localStorage.setItem("language", "ukraine");
    changeLang(languageEn);
  }
});

document.addEventListener("keyup", (event) => {
  const key = document.querySelector(`#${event.code}`);

  if (key && key.id !== "CapsLock") key.classList.remove("active");
});

document
  .querySelector(".keyboard__keys")
  .addEventListener("mousedown", (event) => {
    const keyboardTextArea = document.querySelector(".keyboard__textarea");

    const key = event.target;

    if (key.closest(".keyboard__key")) {
      pressedKey(key);

      if (!key.classList.contains("key__system"))
        keyboardTextArea.value += key.innerHTML;
      else {
        switch (key.id) {
          case "Enter":
            keyboardTextArea.value += "\n";
            break;
          case "Backspace":
            keyboardTextArea.value = keyboardTextArea.value.slice(
              0,
              keyboardTextArea.value.length - 1
            );
            break;
          case "Delete":
            if (
              keyboardTextArea.value.length > keyboardTextArea.selectionStart
            ) {
              keyboardTextArea.value =
                keyboardTextArea.value.slice(
                  0,
                  keyboardTextArea.selectionStart - 1
                ) +
                keyboardTextArea.value.slice(
                  keyboardTextArea.selectionStart,
                  keyboardTextArea.length
                );
            }
            keyboardTextArea.focus();
            break;
        }
      }
    }
  });

document.querySelector(".keyboard__keys").addEventListener("mouseup", () => {
  document.querySelectorAll(".keyboard__key").forEach((key) => {
    if (key && key.id !== "CapsLock") key.classList.remove("active");
  });
});
