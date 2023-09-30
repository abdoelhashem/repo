//
let wordfrom = document.querySelector(".wordfrom"); 
let ars = document.querySelectorAll(".art"); 
let cracters = document.querySelectorAll(".cracter");
let footer = document.querySelector(".footer");
let lost = document.querySelector(".lost");
//
let errors = 0;
lost.innerHTML = `${7 - errors}`;
function* c() {
    yield ars[0].style.display = 'block';
    yield ars[1].style.display = 'block';
    yield ars[2].style.display = 'block';
    yield ars[3].style.display = 'block';
    yield ars[4].style.display = 'block';
    yield ars[5].style.display = 'block';
    yield ars[6].style.display = 'block';
    ars[8].style.display = 'block'
    yield ars[7].style.display = 'block';
}
let y = c();
//
fetch("game.json").then((res) => {
    let result = res.json();
    return result;
}).then((content) => {
    let title = content[Math.trunc(Math.random() * content.length)];
    wordfrom.innerHTML = Object.keys(title)[0];
    let word = title[Object.keys(title)[0]][Math.trunc(Math.random() * title[Object.keys(title)[0]].length)];
    for (i = 0; i < word.length; i++) {
        let box = document.createElement("div");
        box.className = "box";
        let spanbox = document.createElement("span");
        spanbox.innerHTML = word[i];
        spanbox.style.opacity = "0";
        spanbox.className = `${word[i]} wordspan`;
        footer.appendChild(box);
        box.appendChild(spanbox);
    }
    //
    cracters.forEach((x) => {
        x.onclick = () => {
                if (errors != 7 && !x.classList.contains("done")) {
                    x.classList.add("done");
                    x.style.cursor = "default";
                    if (word.includes(x.innerHTML)) {
                        let spans = document.querySelectorAll(".wordspan");
                        spans.forEach((s) => {
                            if (s.classList.item('0') == x.innerHTML) {
                                s.style.opacity = "1";
                            }
                        });
                        let f = Array.from(spans).every((cc) => {
                            return cc.style.opacity == "1";
                        });
                        if (f === true) {
                            location.reload();
                        }
                    } else {
                        errors++;
                        y.next();
                        lost.innerHTML = `${7 - errors}`;
                    }
                } else if(errors == 7) {
                    alert("game over")
                }
        }
    })
    //
}).catch((reg) => {
    console.log("error");
});
//
