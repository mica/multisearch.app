const urlParams = new URLSearchParams(location.search);
let q = urlParams.get('q');
document.querySelector('header').innerText = 'Allow popups for Open All button to work';
document.querySelector('form div').innerText = 'for multiple searches, separate with commas';
document.querySelector('footer').addEventListener('click', () => window.open('https://github.com/mica/multisearch.app'));
if (q) {
    document.getElementById('search').value = q;
    q = q.split(',').map(e => e.trim()).filter(e => {return e !== ''});
    if (q.length > 1) {
        const span = document.createElement('span');
            span.classList.add('hidden');
            span.innerText = 'Multi';
        document.querySelector('h1').prepend(span);
        setTimeout(() => {
            span.classList.add('fade');
            span.classList.remove('hidden');
        }, 300);
    }
    q.reverse().forEach((search, i) => {
        if (!search.length == i) {
            document.title = search + ' - ' + document.title;
        } else {
            document.title = search + ', ' + document.title;
        }
    });
    q.reverse().forEach((search, i) => {
        setTimeout(() => {
            mkBtns(search, i);
        }, 40 * (i + 1));
    });
}
function mkBtns(search, i) {
    const btns = document.createElement('div');
        btns.classList.add('btns');
    document.querySelector('main').insertAdjacentElement('beforeend', btns)
    sites.forEach(site => {
        const btnIcon = document.createElement('img');
            btnIcon.src = 'https://www.google.com/s2/favicons?domain=' + site[1].split('/')[2];
        const btnSite = document.createElement('div');
            btnSite.classList.add('btnSite');
            btnSite.append(btnIcon, site[0]);
        const btnTxt = document.createElement('div');
            btnTxt.classList.add('btnTxt');
            btnTxt.innerHTML = `<small>search</small><br>“<span>${search}</span>”`;
        const btn = document.createElement('div');
            btn.classList.add('btn');
            btn.append(btnSite, btnTxt);
        const btnLink = document.createElement('a');
            btnLink.href = site[1] + encodeURIComponent(search);
            if (site[2]) {
                btnLink.href = btnLink.href + site[2];
            }
            btnLink.classList.add('hidden');
            btnLink.append(btn);
        document.getElementsByClassName('btns')[i].append(btnLink);
    });
    const allTxt = document.createElement('div');
        allTxt.innerHTML = '<span>Open All</span><br>in new tabs';
    const allBtn = document.createElement('div');
        allBtn.classList.add('btnAll');
        allBtn.classList.add('hidden');
        allBtn.append(allTxt);
        allBtn.addEventListener('click', openAll);
    document.getElementsByClassName('btns')[i].append(allBtn);
    document.getElementsByClassName('btns')[i].childNodes.forEach((btn, i) => {
        setTimeout(() => {
            btn.classList.add('fade');
            btn.classList.remove('hidden');
        }, 40 * (i + 1));
    })
}
function openAll() {
    let links = this.parentElement.getElementsByTagName('a');
    links = [...links];
    links.reverse().forEach(link => {
        window.open(link.href);
    });
}
