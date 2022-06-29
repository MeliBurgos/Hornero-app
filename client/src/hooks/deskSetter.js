const DeskSetter = (setShow) => {

  document.querySelectorAll(".fil1").forEach((element, i) => {
    element.setAttribute(`id`, `F1D${i + 1}`)
    element.onclick = (e) => {
      const id = e.target.getAttribute("id");
      if (document.querySelector(`#${id}`).classList.contains("selected")) {
        document.querySelector(`#${id}`).classList.remove("selected")
      } else {
        document.querySelector(`#${id}`).classList.add("selected")
        setShow(true)
      }
      
    };
  });
}

export default DeskSetter