// Para insertar el html de cada elemento del array de ejemplo
const data = [{id:1,title:"Polo con mangas largas", subtitle:"28,99 €",discount:"24,00 €(-17%)",img:"./images/polo-largo.jfif"},
                {id:2,title:"Polo con mangas cortas", subtitle:"28,99 €",discount:"24,00 €(-17%)",img:"./images/polo-corto.jfif"},
                {id:3,title:"Jersey largo", subtitle:"28,99 €",discount:"24,00 €(-17%)",img:"./images/jersey.jfif"},
                {id:4,title:"Pantalones largos", subtitle:"28,99 €",discount:"24,00 €(-17%)",img:"./images/pantalon-largo.jfif"},
                {id:5,title:"Chaqueta larga", subtitle:"28,99 €",discount:"24,00 €(-17%)",img:"./images/cloth.jfif"},
                {id:6,title:"Pantalones largos", subtitle:"28,99 €",discount:"24,00 €(-17%)",img:"./images/pantalon-largo.jfif"}];

const clothItemTemplate = (cloth) => {
    return (
      `<div class="carousel-item" id="${cloth.id}"><div class="carousel-item-img__img">
            <img class="carousel-item__img" src="${cloth.img}" alt="mujer">
        </div><div class="carousel-item__details">
            <p class="carousel-item__details--title">${cloth.title}</p>
            <p class="carousel-item__details--subtitle">${cloth.subtitle}</p>
            <p class="carousel-item__details--discount">${cloth.discount}</p>
            <p class="carousel-item__details--color">más colores</p>
            <div class="carousel-item__details--button">
                <button class="carousel-item__details--button__button" type="button">Añadir</button>
            </div>
        </div></div>`
    )
  }

const createTemplate = (HTMLString) => {
    const html = document.implementation.createHTMLDocument();
    html.body.innerHTML = HTMLString;
    return html.body.children[0];
  }
  
  const renderClothList = (list, $container) => {
    list.forEach((cloth) => {
      const HTMLString = clothItemTemplate(cloth);
      const clothElement = createTemplate(HTMLString);
      $container.append(clothElement);
    });
  }

    const $clothContainer = document.querySelector('#items');
    renderClothList(data,$clothContainer);

    //Controla los botones de añadir y esconder elementos
    let count = data.length;
    let notAvailable = document.getElementById('notClothes');
    document.getElementById("search-minus").onclick = () => {
      if (screen.width > 1112){
        if(count === 3){
          return count;
        }
      } 
      if(count > 1 && notAvailable.style.display != 'block'){
        document.getElementById(count).style.display = "none";
        count--;
      } 
    } 
    document.getElementById("search-plus").onclick = () => { 
      if(count < data.length && notAvailable.style.display != 'block'){
        document.getElementById(count+1).style.display = "inline-block";
        count++;
      } 
    }

  // Filtro del buscador
  const searchBar = document.forms['search-clothes'].querySelector('input');
  searchBar.addEventListener('keyup', (e) => {
  //reiniciamos contador
  count = data.length;  
  const lower = e.target.value.toLocaleLowerCase();
  const clothes = document.getElementsByClassName('carousel-item__details--title');
  let hasResults = false;
  Array.from(clothes).forEach((clothes) => {
    const title = clothes.textContent;
    if (title.toLowerCase().indexOf(lower) != -1) {
      clothes.parentElement.parentElement.style.display = 'inline-block';
      hasResults = true;
    } else {
      clothes.parentElement.parentElement.style.display = 'none';
    }
  });
  notAvailable.style.display = hasResults ? 'none' : 'block';
});




