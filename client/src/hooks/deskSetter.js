const DeskSetter = (setShow,Floor) => {

  document.querySelectorAll(".fil0").forEach((element, i) => {
    element.setAttribute(`id`, `F${Floor}D${i + 1}`)
    element.onclick = (e) => {
      const id = e.target.getAttribute("id");
      if (document.querySelector(`#${id}`).classList.contains("selected")) {
        document.querySelector(`#${id}`).classList.remove("selected")
      } else {
        document.querySelector(`#${id}`).classList.add("selected")
        setShow(id)
      }
      
    };
  });
}

export default DeskSetter