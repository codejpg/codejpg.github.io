import React, { Component } from "react";
import Draggable from "react-draggable";

import HoverImage from "react-hover-image";
import { ThemeConsumer } from "styled-components";
import Modal from "./Modal";
var username


class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameShow: this.props.nameShow,
      modals: this.props.data,
      hovered: false,
    }
    this.state.modals.forEach(function (modal) {
      modal.showModal = false;
    });
    console.log(this.state.modals)
  }

  getModal = data => {
    if (data.name == "Ergebnis") {
      console.log("endquiz done?:", this.props.endQuizDone())
      if (this.props.endQuizDone()) {
        console.log("endquiz done?:", this.props.openAuswertung())
        this.props.openAuswertung()

      } else {
        this.props.openEndQuiz()
      }
    } else {
      let modal;
      this.state.modals.forEach(function (modal) {
        modal.isActive = false;
      });
      let modals = [...this.state.modals];
      if (data.id == 100) {
        modal = modals[1]
      } else {
        modal = { ...modals[data.id - 1] };
      }
      modal.showModal = true;
      modal.isActive = true;
      modals[data.id - 1] = modal;
      this.setState({ modals }, () => { console.log(this.state.modals); });
    }

  };

  hideModal = data => {
    let modals = [...this.state.modals];
    let modal = { ...modals[data.id - 1] };
    modal.showModal = false;
    modal.isActive = false;
    modals[data.id - 1] = modal;
    this.setState({ modals });
  };

  getActive = data => {
    this.state.modals.forEach(function (modal) {
      modal.isActive = false;
    });
    let modals = [...this.state.modals];
    let modal = { ...modals[data.id - 1] };

    modals[data.id - 1] = modal;
    modal.isActive = true;
    this.setState({ modals }, () => { console.log(modal + " ist aktiv"); });

  };

  hoverEffect = (e) => {

    e.currentTarget.style.transition = "0.5s all"
    e.currentTarget.style.opacity = "0"
    e.currentTarget.src = e.target.dataset.key
  }

  render() {



    return (



      <div className="folderWrapperWrapper">

        { this.props.data.map((data, key) => (
          data.nameShow ? username = this.props.getName() + "'s" : username = "",
          data.show && data.id != 100 ?
            <div key={data.id} id={data.id} name={data.name} className="folderWrapper">
              <div onClick={() => this.getModal(data)}>
                {/* <img className="folderImage" 
                  src={data.image}
                  data-key={data.hoverImage}
                  onMouseEnter={e => this.hoverEffect(e)}
                  onMouseOut={e => (e.currentTarget.src = data.image)}
      />*/}
                <HoverImage className="folderImage" src={data.image} hoverSrc={data.hoverImage} onMouseOut={() => this.setState({ hovered: false })}
                  onMouseOver={() => this.setState({ hovered: true })}
                  style={{ transform: `${this.state.hovered ? 'scale(2.5,2.5)' : null}` }}></HoverImage>


                <p>{username}  {data.name}</p></div>
            </div> : null
        ))}

        {this.props.data.map((data) =>
          <Modal
            show={this.state.modals[data.id - 1].showModal}
            onHide={() => this.hideModal(data)}
            name={this.state.modals[data.id - 1].name}
            content={this.state.modals[data.id - 1].content}
            image={this.state.modals[data.id - 1].image}
            hoverImage={this.state.modals[data.id - 1].hoverImage}
            modalClass={this.state.modals[data.id - 1].className}
            isActive={this.state.modals[data.id - 1].isActive}
            onClick={() => this.getActive(data)}
          />
        )}
      </div>



    )
  }
}

export default Product
