import { useState } from 'preact/hooks';
import styled from "styled-components";
import { Modal } from "@arcteryx/components-modal";
import Imgix from "react-imgix";

const CalloutWrapper = styled.div`
  position: fixed;
  bottom: 45px;
  right: 34px;
  width: 199px;
  height: 167px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9;
  outline: #ccc 1px solid;
  color: #1f1d1e;
  background-color: #fff;
  filter: drop-shadow(6px 6px 6px #00000029);
  cursor: pointer;
  text-transform: uppercase;
  font-size: 15px;
  font-weight: bold;
  line-height: 1.2;
  visibility: ${props => props.visibility};
  transition: visibility 1s;
  animation: 1s ${props => props.slideDirection};

  &:hover {
    outline: #000 1px solid;
  }

  @keyframes slideUp {
    from {
      bottom: -170px;
    }

    to {
      bottom: 45px;
    }
  }

  @keyframes slideDown {
    from {
      bottom: 45px;
    }

    to {
      bottom: -170px;
    }
  }
`;

const Button = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  margin: 6px;
  cursor: pointer;
  outline: none;
  font-size: 25px;
  line-height: 0.5em;
  z-index: 100;
  border: 0;
  padding: 0;
  background-color: #fff;
`;

const CalloutInnerWrapper = styled.span`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
const Content = styled.div`
  margin-bottom: 10px;
`;

const Text = styled.div`
  text-align: center;
`;

const figcaption = {
	display: "none",
  };

const CallOut = props => {
	const [slideDirection, setSlideDirection] = useState("slideUp");
	const [visibility, setVisibility] = useState("visible");
	const [isCalloutClosed] = useState(
	  Boolean(window.sessionStorage.getItem(props.sessionStorageItem || "callout-session-closed"))
	);
	const [modalIsShown, toggleModal] = useState(false);
	const [modalCaller, setModalCaller] = useState();

	const handleClick = e => {
		setModalCaller(e.currentTarget);
		toggleModal(!modalIsShown);
	};
	
	const handleCloseButtonClick = () => {
		setSlideDirection("slideDown");
		setVisibility("hidden");
		toggleModal(false);
		window.sessionStorage.setItem(props.sessionStorageItem || "callout-session-closed", "true");
	};

	return (
		!isCalloutClosed && (
		  <CalloutWrapper slideDirection={slideDirection} visibility={visibility} className="qa-callout-wrapper">
			<Button onClick={handleCloseButtonClick}>&times;</Button>
			<CalloutInnerWrapper onClick={e => handleClick(e)} className="qa-callout-wrapper__inner">
			  <Content>{props.children}</Content>
			  <Text>{props.text}</Text>
			</CalloutInnerWrapper>
			{props.iframeUrl ? (
			  <Modal modalIsShown={modalIsShown} toggleModal={toggleModal} modalCaller={modalCaller} iframe>
				<iframe src={props.iframeUrl}></iframe>
			  </Modal>
			) : (
			  ""
			)}
		  </CalloutWrapper>
		)
	  );
}

const App = () => (
	<CallOut
	  text="Questions about product or sizing?"
	  isActive={true}
	  iframeUrl="http://landing-pages.us-west-2.elasticbeanstalk.com/outdoor/ca/en/help/va-modal/"
	  sessionStorageItem="callout-session-closed--va"
	>
	  <figure>
		<Imgix
		  src={
			"https://images-dynamic-arcteryx.imgix.net/virtual-advisor-callout/a6ff6a61-6c57-44ec-bdb0-dcae77bb05d6.png"
		  }
		  height={83}
		  imgixParams={{ auto: "format,compress", q: 75 }}
		  htmlAttributes={{ alt: "Virtual Advisor" }}
		/>
		<figcaption style={figcaption}>Virtual Advisor</figcaption>
	  </figure>
	</CallOut>
  );

export default App;
