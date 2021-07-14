import React from "react";

const Footer = () => {
  //   const [cursor, setCursor] = useState("default");
  //   const { loggedIn, setLoggedIn } = useContext(UserContext);

  //   //console.log("rendered nav bar again");
  //console.log(loggedIn);
  return (
    <div
      style={{
        top: "94vh",
        right: "2.5vw",
        margin: 0,
        padding: 0,
        position: "absolute",
        textAlign: "center",
      }}
    >
      <span className="musicattribution">
        {/* <a href="#">
          <i class="fa fa-facebook"></i>
        </a> */}
        {/* <a href="#">
          <i class="fa fa-twitter"></i>
        </a> */}
        <span className="attribution">
          Song From: Avicii - The Nights (Alex Bamford Remix) de Alex Bamford
          está posteada bajo una licencia Creative Commons.
        </span>
        <span>Copyright</span> &#169; 2021 Utkarsh Agarwal{"     "}
      </span>
      <span
        style={{
          marginLeft: "1vw",
        }}
      >
        <a
          style={{ color: "black", fontSize: "4vmin" }}
          href="https://www.linkedin.com/in/utkarshagarwal28/"
        >
          <i class="fa fa-linkedin"></i>
        </a>
        {"    "}
        <a
          style={{ marginLeft: "1vw", color: "black", fontSize: "4vmin" }}
          href="https://github.com/Utkarsh2802/Utkarsh_website"
        >
          <i class="fa fa-github"></i>
        </a>
      </span>
    </div>
  );
};

export default Footer;
