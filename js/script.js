function showKeyboard() {
   return document.body.innerHTML = `
    <div class="wrapper">
        <div class="keyboard">
            <h1 class="keyboard__title">Virtual Keyboard</h1>
            <textarea class="keyboard__textarea" autofocus></textarea>
            <div class="keyboard__keys"></div>
            <div class="keyboard__text">
                <p>Keyboard designed for Windows OS</p>
                <p>To switch the language, the combination is: Ctrl + Shift</p>
            </div>
        </div>
    </div>`;
}

showKeyboard();