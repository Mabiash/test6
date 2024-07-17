const querySelectAll = (attr_name) => document.querySelectorAll(attr_name);
const querySelectOne = (attr_name) => document.querySelector(attr_name);

// humberger menu ==============================================================
const humberger_menu = querySelectOne(".hambergerMenu");
const nav_container = querySelectOne(".navigationContainer");
let hasToogleClass = false;
humberger_menu.addEventListener("click", () => {
  hasToogleClass = !hasToogleClass;
  hasToogleClass
    ? nav_container.classList.remove("nav-toogle")
    : nav_container.classList.add("nav-toogle");
});

// CV downlaod ========================================================================
const download_CV = querySelectAll(".downLoadCv");

download_CV.forEach((dl_button) => {
  let createdaTag = document.createElement("a");
  dl_button.addEventListener("click", () => {
    createdaTag.href = "./images/sample.jpg";
    createdaTag.download = "sample.jpg";
    createdaTag.click();
  });
});

let aTags = querySelectAll("a");

// current page ===============================================================

const scrollPage = (attrName, elementName, className) => {
  const current_page_navLinks = Array.from(elementName).find(
    (as) => as.getAttribute("name") === attrName
  );

  if (current_page_navLinks) {
    querySelectOne("." + className)?.classList.remove(className);
    current_page_navLinks.classList.add(className);
  }
  console.log(current_page_navLinks);
};

window.addEventListener("scroll", () => {
  let phoneHeightHalf = window.innerHeight / 2 - 100;
  let scrollFromTop = document.documentElement.scrollTop;

  const scrollCalc = (currentPage, nextPage) =>
    scrollFromTop >= phoneHeightHalf * currentPage &&
    scrollFromTop < phoneHeightHalf * nextPage;

  switch (true) {
    case scrollCalc(1, 10):
      scrollPage("About", aTags, "active");
      break;
    case scrollCalc(10, 15):
      scrollPage("Services", aTags, "active");
      break;
    case scrollCalc(15, 20):
      scrollPage("Contacts", aTags, "active");
      break;
    default:
      scrollPage("Home", aTags, "active");
  }

  console.log("scrollFromTop", scrollFromTop);
});

// alert(window.innerWidth)

// message me

const sendEmail = () => {
  let sent_verify = querySelectOne(".email-sent-ver");
  let name_ipt = document.getElementById("ipt-name");
  let email_ipt = document.getElementById("ipt-email");
  let message_ipt = document.getElementById("ipt-message");

 if(email_ipt.value != "" || message_ipt.value != ""){
  let param = {
    name: name_ipt.value,
    email: email_ipt.value,
    message: message_ipt.value,
  };

  emailjs.send("service_caae0pj", "template_aeywzmt", param).then((_) => {
    sent_verify.style.display = "block";
    sent_verify.innerHTML = `Hello ${param.name} your message has been successfully send!`;

    setTimeout(() => {
      sent_verify.style.display = "none";
    }, 10000);
  });

  name_ipt.value = "";
  email_ipt.value = "";
  message_ipt.value = "";
 }


};
