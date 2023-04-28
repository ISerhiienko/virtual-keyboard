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
  { key: "KeyQ", en: "q" },
  { key: "KeyW", en: "w" },
  { key: "KeyE", en: "e" },
  { key: "KeyR", en: "r" },
  { key: "KeyT", en: "t" },
  { key: "KeyY", en: "y" },
  { key: "KeyU", en: "u" },
  { key: "KeyI", en: "i" },
  { key: "KeyO", en: "o" },
  { key: "KeyP", en: "p" },
  { key: "BracketLeft", en: "[" },
  { key: "BracketRight", en: "]" },
  { key: "Backslash", en: "\\" },
  { key: "Delete", en: "del", system: true },
  { key: "End", en: "end", system: true },
  { key: "CapsLock", en: "caps lock", system: true },
  { key: "KeyA", en: "a" },
  { key: "KeyS", en: "s" },
  { key: "KeyD", en: "d" },
  { key: "KeyF", en: "f" },
  { key: "KeyG", en: "g" },
  { key: "KeyH", en: "h" },
  { key: "KeyJ", en: "j" },
  { key: "KeyK", en: "k" },
  { key: "KeyL", en: "l" },
  { key: "Semicolon", en: ";" },
  { key: "Quote", en: "'" },
  { key: "Enter", en: "enter", system: true },
  { key: "PageUp", en: "page up", system: true },
  { key: "ShiftLeft", en: "shift", system: true },
  { key: "KeyZ", en: "z" },
  { key: "KeyX", en: "x" },
  { key: "KeyC", en: "c" },
  { key: "KeyV", en: "v" },
  { key: "KeyB", en: "b" },
  { key: "KeyN", en: "n" },
  { key: "KeyM", en: "m" },
  { key: "Comma", en: "," },
  { key: "Period", en: "." },
  { key: "Slash", en: "/" },
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

function renderKeyboard() {
  const keyboardKeys = document.querySelector(".keyboard__keys");
  let keyButton;

  keys.forEach((keyElement) => {
    keyButton = document.createElement("div");
    keyButton.className = "keyboard__key";
    keyButton.setAttribute("id", keyElement.key);
    keyButton.innerHTML = keyElement.en;
    keyboardKeys.append(keyButton);

    if (keyElement.system) keyButton.classList.add("key_system");
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
                <p>To switch the language, the combination is: <strong>Ctrl + Shift</strong></p>
            </div>
        </div>
    </div>`;
  renderKeyboard();
}

showKeyboard();

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

      if (!key.classList.contains("key_system"))
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
