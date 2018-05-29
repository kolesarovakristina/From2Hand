import React from "react";
import AdvertWrapper from "../../components/AdvertWrapper";
import PropTypes from "prop-types";
import { StyledWrapper } from "./styles";
import axios from 'axios';

class AllUserAdverts extends React.Component {
  state = {
    userAdverts: []
  };

  componentWillMount() {
    this.fillStateData();
  }

  fillStateData = async () => {
    try {
      const response = await axios.get("/advert");
      this.setState({ userAdverts: response.data });
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  componentDidMount() {
    console.log(this.props.match.params.id);
    const idParam = this.props.match.params.id;
    console.log(this.props.novyObjekt);
  }
  render() {
    return (
      <StyledWrapper>
          {this.state.userAdverts.map((item, index) => (
            <AdvertWrapper
              item={item}
              // title={item.name}
              // description={item.descr}
              // price={item.price + "€"}
              // district={item.district}
              // cityDistrict={item.cityDistrict}
              // poziciaVpoli={index}
              // id={item.id}
              user = {true}
            />
          ))}
      </StyledWrapper>
    );
  }
}
export default AllUserAdverts;
