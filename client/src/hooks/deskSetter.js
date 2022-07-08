const DeskSetter = (Floor, dayReserv, officeNameOk, favorites, setShow) => {

  document.querySelectorAll(".fil0").forEach((element, i) => {
      var rect = element.getBoundingClientRect();
console.log(rect.top, rect.right, rect.bottom, rect.left)
    element.setAttribute(`id`, `F${Floor}D${i + 1}`)
    element.onclick = (e) => {
      let id = e.target.getAttribute("id");
      let reserva = dayReserv.find((reserv) => reserv.booking === `F${Floor}D${i + 1}`)
      setShow({ desk: id, reserve: reserva })
    }

    if (dayReserv.find((reserv) => reserv.booking === `F${Floor}D${i + 1}`)) {
      element.classList.add('reserved')
    } else {
      if (element.classList.contains("reserved")) {
        element.classList.remove('reserved')
      }
    }

      
    if (favorites.find((fav) => fav === `${officeNameOk}:F${Floor}D${i + 1}`)) {
      element.classList.add('favorite')
    } else {
      if (element.classList.contains("favorite")) {
        element.classList.remove('favorite')
      }
    }


  });
}

export default DeskSetter