import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useCssHandles } from "vtex.css-handles";

const CSS_HANDLES = ["megamenu"];

const MegaMenu = ({}) => {
  const [categories, setCategories] = useState([]);
  const handles = useCssHandles(CSS_HANDLES);

  useEffect(() => {
    (async () => {
      const response = await axios.get(
        "/api/catalog_system/pub/category/tree/3"
      );
      setCategories(response.data);
    })();
  }, []);
  console.log(categories);
  return (
    <>
      <div className={`${handles.megamenu} mv5 relative w-100 mw4`}>
        <FontAwesomeIcon icon={faBars} />
        <span className="mh4">Pasillos</span>
        <FontAwesomeIcon icon={faChevronDown} />
      </div>
      <div
        className={`${handles.megamenu} absolute bottom--2 w-100 mw6 br2 h5`}
      >
        <nav>
          <a href="#">Login</a>
          <hr />
          <a href="">Mis Listas</a>
          <a href="">Estado del pedido</a>
          <hr />
          {categories?.map((categorie) => {
            return (
              <a href={categorie.url}>
                {categorie.name}
                <div className="flex flex-column">
                  <h2>
                    <a href={categorie.url}>{categorie.name}</a>
                  </h2>
                  <hr />
                  {categorie.children?.map((child) => {
                    return (
                      <>
                        <a href={child.url}>{child.name}</a>
                        <a href={child.url}>Ver todos</a>
                      </>
                    );
                  })}
                </div>
              </a>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default MegaMenu;
