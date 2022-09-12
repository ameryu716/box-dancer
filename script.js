class LinkBox {
    /**
     *
     * @param {HTMLElement} appendArea
     * @param {object} option {name,link,key,childs}
     */
    constructor(appendArea = null, element = null, option = {}) {
        this.appendArea = appendArea;
        this.name = option.name;
        this.link = option.link;
        this.boxKey = option.key;
        this.childs = option.childs;
        this.element = element;
        this.createBox();
    }

    createBox() {
        this.element.classList.add("box");
        this.element.id = this.boxKey;
        console.log(this.childs);

        const delete_btn = document.createElement('button');
        delete_btn.classList.add('delete');
        const close = document.createElementNS('http://www.w3.org/2000/svg','svg');
        close.setAttribute('height','48px');
        close.setAttribute('width','48px');
        const path = document.createElementNS('http://www.w3.org/2000/svg','path');
        path.setAttribute('d','m16.5 33.6 7.5-7.5 7.5 7.5 2.1-2.1-7.5-7.5 7.5-7.5-2.1-2.1-7.5 7.5-7.5-7.5-2.1 2.1 7.5 7.5-7.5 7.5ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.8 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24 4q4.15 0 7.8 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm0-3q7.1 0 12.05-4.975Q41 31.05 41 24q0-7.1-4.95-12.05Q31.1 7 24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24 41Zm0-17Z');
        path.setAttribute('fill','#fff');
        close.appendChild(path);
        delete_btn.addEventListener('click',()=>{
            this.deleteBox();
        })
        delete_btn.appendChild(close);
        this.element.appendChild(delete_btn);
        if (this.childs.length > 0) {
            this.element.classList.add("directory");
            const span = document.createElement("span");
            span.innerText = this.name;
            this.element.appendChild(span);

            const svg = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "svg"
            );
            svg.setAttribute("width", 20);
            svg.setAttribute("height", 10);
            const svg_path = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "path"
            );
            svg_path.setAttribute("d", "m10 10-10-9.95h20Z");
            svg.appendChild(svg_path);
            this.element.appendChild(svg);

            this.appendArea.appendChild(this.element);

            this.childs.forEach((c) => {
                const c_element = document.createElement("div");
                c_element.classList.add("child");
                new LinkBox(this.appendArea, c_element, c);
            });

            this.element.addEventListener("click", () => {
                this.openToggle();
            });
        } else {
            const l = document.createElement("a");
            l.target = "_blank";
            l.href = this.link;
            l.innerText = this.name;
            this.element.appendChild(l);
            this.appendArea.appendChild(this.element);
        }
    }

    openToggle() {
        this.element.classList.toggle("open");
        this.childs.forEach((c) => {
            const child = document.getElementById(c.key);
            if (child.classList.contains("show")) {
                child.classList.toggle("visible");
                setTimeout(() => {
                    child.classList.toggle("show");
                }, 500);
            } else {
                child.classList.toggle("show");
                setTimeout(() => {
                    child.classList.toggle("visible");
                }, 100);
            }
        });
    }

    deleteBox(){
        const json = localStorage.getItem("box-dancer-2022");
        if (json !== null) {
            let json_data = JSON.parse(json);
            json_data = json_data.filter(j => j.key !== this.boxKey);
            const regist_json = JSON.stringify(json_data);
            localStorage.setItem("box-dancer-2022", regist_json);
        }

        location.reload();
    }
}

let json_data = null;

const id = 0;

function jsonDataLoad(appendArea) {
    const json = localStorage.getItem("box-dancer-2022");
    if (json !== null) {
        json_data = JSON.parse(json);
    } else {
        json_data = [];
    }

    json_data.forEach((j) => {
        const box = document.createElement("div");
        const linkbox = new LinkBox(appendArea, box, j);
    });
}

function showRegistDialog() {
    const dialog = document.getElementById("regist-dialog");
    dialog.classList.add("show");
}

function closeRegistDialog() {
    const dialog = document.getElementById("regist-dialog");
    dialog.classList.remove("show");
}

function registBox() {
    
    const name = document.getElementById("name");
    const link = document.getElementById("link");
    const key = document.getElementById("key");

    if(json_data.some(j => j.key === key.value)){
        alert('キーの重複があります。\nこのキーは登録できません。');
        return;
    }
    json_data.push({
        name: name.value,
        link: link.value,
        key: key.value,
        childs: [],
    });

    const json = JSON.stringify(json_data);

    localStorage.setItem("box-dancer-2022", json);
    location.reload();
}


/////////-------------------------------- 時計 --------------------------------///////////

const rotateSteps = [
    {
        transform: "rotate(0deg)",
    },
    {
        transform: "rotate(6deg)",
    },
    {
        transform: "rotate(12deg)",
    },
    {
        transform: "rotate(18deg)",
    },
    {
        transform: "rotate(24deg)",
    },
    {
        transform: "rotate(30deg)",
    },
    {
        transform: "rotate(36deg)",
    },
    {
        transform: "rotate(42deg)",
    },
    {
        transform: "rotate(48deg)",
    },
    {
        transform: "rotate(54deg)",
    },
    {
        transform: "rotate(60deg)",
    },
    {
        transform: "rotate(66deg)",
    },
    {
        transform: "rotate(72deg)",
    },
    {
        transform: "rotate(78deg)",
    },
    {
        transform: "rotate(84deg)",
    },
    {
        transform: "rotate(90deg)",
    },
    {
        transform: "rotate(96deg)",
    },
    {
        transform: "rotate(102deg)",
    },
    {
        transform: "rotate(108deg)",
    },
    {
        transform: "rotate(114deg)",
    },
    {
        transform: "rotate(120deg)",
    },
    {
        transform: "rotate(126deg)",
    },
    {
        transform: "rotate(132deg)",
    },
    {
        transform: "rotate(138deg)",
    },
    {
        transform: "rotate(144deg)",
    },
    {
        transform: "rotate(150deg)",
    },
    {
        transform: "rotate(156deg)",
    },
    {
        transform: "rotate(162deg)",
    },
    {
        transform: "rotate(168deg)",
    },
    {
        transform: "rotate(174deg)",
    },
    {
        transform: "rotate(180deg)",
    },
    {
        transform: "rotate(186deg)",
    },
    {
        transform: "rotate(192deg)",
    },
    {
        transform: "rotate(198deg)",
    },
    {
        transform: "rotate(204deg)",
    },
    {
        transform: "rotate(210deg)",
    },
    {
        transform: "rotate(216deg)",
    },
    {
        transform: "rotate(222deg)",
    },
    {
        transform: "rotate(228deg)",
    },
    {
        transform: "rotate(234deg)",
    },
    {
        transform: "rotate(240deg)",
    },
    {
        transform: "rotate(246deg)",
    },
    {
        transform: "rotate(252deg)",
    },
    {
        transform: "rotate(258deg)",
    },
    {
        transform: "rotate(264deg)",
    },
    {
        transform: "rotate(270deg)",
    },
    {
        transform: "rotate(276deg)",
    },
    {
        transform: "rotate(282deg)",
    },
    {
        transform: "rotate(288deg)",
    },
    {
        transform: "rotate(294deg)",
    },
    {
        transform: "rotate(300deg)",
    },
    {
        transform: "rotate(306deg)",
    },
    {
        transform: "rotate(312deg)",
    },
    {
        transform: "rotate(318deg)",
    },
    {
        transform: "rotate(324deg)",
    },
    {
        transform: "rotate(330deg)",
    },
    {
        transform: "rotate(336deg)",
    },
    {
        transform: "rotate(342deg)",
    },
    {
        transform: "rotate(348deg)",
    },
    {
        transform: "rotate(354deg)",
    },
    {
        transform: "rotate(360deg)",
    },
];

const rotateTimingMinute = {
    duration: 60 * 60 * 1000,//60分
    iterations: Infinity,
    steps: [60,'start']
}

const rotateTimingHour = {
    duration: 60 * 60 * 12 * 1000,//半日
    iterations: Infinity,
    steps: [60,'start']
}

function applyWatch(element_minute,element_hour) {
    const date = new Date();
    const minute = date.getMinutes();
    const hour = date.getHours();
    element_minute.currentTime = minute * 60 * 1000;
    element_hour.currentTime = hour * 60 * 60 * 1000;
}

/////////-------------------------------- 時計 --------------------------------///////////

/////////-------------------------------- 設定 --------------------------------///////////

let setting_mode = false;

function settAreaToggle(){
    const sett = document.getElementById('setting-area');

    if(sett.classList.contains('show')){
        sett.classList.remove('visible');
        setTimeout(() => {
            sett.classList.remove('show');
        }, 500);
    }else{
        sett.classList.add('show');
        setTimeout(() => {
            sett.classList.add('visible');
        }, 100);
    }

    setting_mode = !setting_mode;
    document.getElementById("index").classList.toggle('setting-mode')
}

function jsonImport(){
    const textarea = document.getElementById('json-import-text');
    const value = textarea.value;
    if(value !== null && value.length > 0){
        localStorage.setItem("box-dancer-2022",value);
        location.reload();
    }else{
        alert('登録がありません');
    }
    
}

function jsonExport(){
    const json = localStorage.getItem("box-dancer-2022");
    if(json !== null){
        const blob = new Blob([json], { type: 'text/plain' });
        const aTag = document.createElement('a');
        aTag.href = URL.createObjectURL(blob);
        aTag.target = '_blank';
        aTag.download = 'box-dancer-composition.json';
        aTag.click();
        URL.revokeObjectURL(aTag.href);
    }else{
        alert('登録がありません');
    }
}

function jsonDelete(){
    if(!confirm('ページ上の全てのデータを削除します。本当によろしいですか？')) return;
    localStorage.removeItem('box-dancer-2022');
    location.reload();
}

/////////-------------------------------- 設定 --------------------------------///////////


window.addEventListener("load", () => {
    const index_area = document.getElementById("index");
    jsonDataLoad(index_area);

    Array.from(document.getElementsByClassName("append-box")).forEach((a) => {
        a.addEventListener("click", () => {
            showRegistDialog();
        });
    });

    const dialog_close = document.getElementById("close");
    dialog_close.addEventListener("click", () => {
        closeRegistDialog();
    });

    const dialog_regist = document.getElementById("regist");
    dialog_regist.addEventListener("click", () => {
        registBox();
    });

    const sett = document.getElementById('setting');
    sett.addEventListener('click',() => {
        console.log('cl');
        settAreaToggle();
    })

    const json_import = document.getElementById('json-import');
    json_import.addEventListener('click',()=>{
        jsonImport();
    })

    const json_export = document.getElementById('json-export');
    json_export.addEventListener('click',()=>{
        jsonExport();
    })

    const json_delete = document.getElementById('setting-delete');
    json_delete.addEventListener('click',()=>{
        jsonDelete();
    })






    const minute_needle = document.getElementsByClassName('rotates-minute')[0];
    const needle_animate_minute = minute_needle.animate(rotateSteps,rotateTimingMinute);

    const hour_needle = document.getElementsByClassName('rotates-hour')[0];
    const needle_animate_hour = hour_needle.animate(rotateSteps,rotateTimingHour);
    applyWatch(needle_animate_minute,needle_animate_hour);
});


window.addEventListener("keydown", (e) => {
    // if (e.key === 'p') {
    //     document.getElementById('portainer').click();
    // }
    // if (e.key === 's') {
    //     document.getElementById('phpmyadmin').click();
    // }
});