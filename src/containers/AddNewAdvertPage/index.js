import React from "react";
import FirstPage from '../../components/AddAdvertComponent/FirstPage';
import SecondPage from '../../components/AddAdvertComponent/SecondPageCategory';
import ThirdPage from '../../components/AddAdvertComponent/ThirdPageDesc';
import FourthPage from '../../components/AddAdvertComponent/FourthPageDragAndDrop';
import LastPage from '../../components/AddAdvertComponent/LastPage';
import { StyledTitle, StyledWrapper } from "./styles";
import axios from 'axios';
import base64 from "base-64";


class AddNewAdvertPage extends React.Component {
    state = {
        toPage2State: false,
        toPage3State: false,
        toPage4State: false,
        toPage5State: false,
        backTo1State: false,
        backTo2State: false,
        backTo3State: false,
        backTo4State: false,
        title: '',
        categoryId: '',
        subcategoryId: '',
        desc: '',
        price: '',
        district: '',
        image: '',
        category: '',
        subcategory: '',
        token: '',
        imageUrl: null,
        defaultPhoto: true
    }


    handleToPage2 = () => {
        this.setState({toPage2State:true});
        this.setState({toPage3State:false});
        this.setState({toPage4State:false});
        this.setState({toPage5State:false});
        this.setState({backTo1State:false});
        this.setState({backTo2State:false});
        this.setState({backTo3State:false});
        this.setState({backTo4State:false});
    }

    handleToPage3 = () => {
        this.setState({toPage2State:false});
        this.setState({toPage3State:true});
        this.setState({toPage4State:false});
        this.setState({toPage5State:false});
        this.setState({backTo1State:false});
        this.setState({backTo2State:false});
        this.setState({backTo3State:false});
        this.setState({backTo4State:false});
    }

    handleToPage4 = () => {
        this.setState({toPage2State:false});
        this.setState({toPage3State:false});
        this.setState({toPage4State:true});
        this.setState({toPage5State:false});
        this.setState({backTo1State:false});
        this.setState({backTo2State:false});
        this.setState({backTo3State:false});
        this.setState({backTo4State:false});
    }

    handleToPage5 = () => {
        this.setState({toPage2State:false});
        this.setState({toPage3State:false});
        this.setState({toPage4State:false});
        this.setState({toPage5State:true});
        this.setState({backTo1State:false});
        this.setState({backTo2State:false});
        this.setState({backTo3State:false});
        this.setState({backTo4State:false});
    }

    handleBackToPage1 = () => {
        this.setState({toPage2State:false});
        this.setState({toPage3State:false});
        this.setState({toPage4State:false});
        this.setState({toPage5State:false});
        this.setState({backTo1State:true});
        this.setState({backTo2State:false});
        this.setState({backTo3State:false});
        this.setState({backTo4State:false});
    }

    handleBackToPage2 = () => {
        this.setState({toPage2State:false});
        this.setState({toPage3State:false});
        this.setState({toPage4State:false});
        this.setState({toPage5State:false});
        this.setState({backTo1State:false});
        this.setState({backTo2State:true});
        this.setState({backTo3State:false});
        this.setState({backTo4State:false});
    }

    handleBackToPage3 = () => {
        this.setState({toPage2State:false});
        this.setState({toPage3State:false});
        this.setState({toPage4State:false});
        this.setState({toPage5State:false});
        this.setState({backTo1State:false});
        this.setState({backTo2State:false});
        this.setState({backTo3State:true});
        this.setState({backTo4State:false});
    }

    handleBackToPage4 = () => {
        this.setState({
            defaultPhoto:true,
            toPage2State:false,
            toPage3State:false,
            toPage4State:false,
            toPage5State:false,
            backTo1State:false,
            backTo2State:false,
            backTo3State:false,
            backTo4State:true
        });

    }

    handleValueFromTitle = event => {
        this.setState({ title: event.target.value });
        console.log(event.target.value);
    }

    handleValueFromCategory = event => {
        this.setState({ categoryId: event.target.value });
        this.setState({ category: event.target.options[event.target.selectedIndex].text});
    }

    handleValueFromSubcategory = event => {
        this.setState({ subcategoryId: event.target.value });
        this.setState({ subcategory: event.target.options[event.target.selectedIndex].text});
        console.log(event.target.value);
    }

    handleValueFromDesc = event => {
        this.setState({ desc: event.target.value });
        console.log(event.target.value);
    }

    handleValueFromPrice = event => {
        this.setState({ price: event.target.value });
        console.log(event.target.value);
    }

    handleValueFromDistrict = event => {
        this.setState({ district: event.target.value });
        console.log(event.target.value);
    }

    handleValueFromCityDistrict = event => {
        this.setState({ cityDistrict: event.target.value });
        console.log(event.target.value);
    }

    handleValueFromImage = event => {
        console.log(event.target.files[0]);

        this.setState({defaultPhoto: false});

        this.setState({image: event.target.files[0]}, ()=>{

            const reader = new FileReader();
            const file = this.state.image;
            console.log('file ',file);
            reader.onloadend = () => {
                this.setState({
                    imageUrl: reader.result
                })
            }
            if (file) {
                reader.readAsDataURL(file);
                this.setState({
                    imageUrl: reader.result
                }, () => {
                    console.log(this.state.imageUrl);
                });
            } 
            else {
                this.setState({
                    imageUrl: ""
                })
            }

        });
    }

    componentWillMount() {
      const token1 = JSON.parse(window.sessionStorage.getItem("token")) || null;
      const token = window.sessionStorage.getItem("token") || null;
      if(token1){
        const parsedToken = token1.data.split(".");
        const role = JSON.parse(base64.decode(parsedToken[1]));
        this.setState({role: JSON.parse(base64.decode(parsedToken[1]))});
        this.setState({token: JSON.parse(window.sessionStorage.getItem("token"))});
        if (role.auth[0].authority === "ROLE_ADMIN")
            this.props.history.push("/");
      }

        if(token)
            this.setState({token: JSON.parse(token)});
        else
            this.props.history.push("/");
    }

    createAdvert = async (event) => {
        event.preventDefault();

        const form = new FormData();
        form.append("category", this.state.subcategoryId);
        form.append("district", this.state.district);
        form.append("descr", this.state.desc);
        form.append("name", this.state.title);
        form.append("price", this.state.price);
        form.append("photo", this.state.image);
        console.log(form);

        const config = {
            headers: {'Authorization': "Bearer " + this.state.token.data}
        }

        try {
        const response = await axios({
            method: "post",
            url: "/advert",
            data: form,
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${this.state.token.data}`
            },
        });
        alert("Advert successfully added!");
        this.props.history.push("/dashboard/user/myadverts");

        } catch (err) {
            console.log(err);
            alert("Something went wrong, please try again.");
            this.props.history.push("/dashboard/addAdvert");

        }
    }

    render() {

        if (this.state.toPage2State) {
            return (
                <StyledWrapper>
                    <StyledTitle>Add New Advert</StyledTitle>
                    <SecondPage backTo1Page={this.handleBackToPage1}
                                toPage3={this.handleToPage3}
                                categoryValue={this.handleValueFromCategory}
                                subcategoryValue={this.handleValueFromSubcategory} />
                </StyledWrapper>
            );
        }

        if (this.state.toPage3State) {
            return (
                <StyledWrapper>
                    <StyledTitle>Add New Advert</StyledTitle>
                    <ThirdPage backTo2Page={this.handleBackToPage2}
                               toPage4={this.handleToPage4}
                               textareaValue={this.handleValueFromDesc}
                               priceValue={this.handleValueFromPrice}
                               districtValue={this.handleValueFromDistrict}
                               citydistrictValue={this.handleValueFromCityDistrict} />
                </StyledWrapper>
            );
        }

        if (this.state.toPage4State) {
            return (
                <StyledWrapper>
                    <StyledTitle>Add New Advert</StyledTitle>
                    <FourthPage backTo3Page={this.handleBackToPage3}
                                toPage5={this.handleToPage5}
                                getPhotoData={this.handleValueFromImage}
                                inputImage={`${this.state.imageUrl}`}
                                defaultPhoto={this.state.defaultPhoto} />
                </StyledWrapper >
            );
        }

        if (this.state.toPage5State) {
            return (
                <StyledWrapper>
                    <StyledTitle>Add New Advert</StyledTitle>
                    <LastPage backTo4Page={this.handleBackToPage4}
                              image={`${this.state.imageUrl}`}
                              title={this.state.title}
                              category={this.state.category}
                              subcategory={this.state.subcategory}
                              desc={this.state.desc}
                              price={this.state.price +'€'}
                              district={this.state.district}
                              cityDistrict={this.state.cityDistrict}
                              send={this.createAdvert}/>
                </StyledWrapper >
            );
        }

        if (this.state.backTo1State) {
            return (
                <StyledWrapper>
                    <StyledTitle>Add New Advert</StyledTitle>
                    <FirstPage toPage2 = {this.handleToPage2}
                               getValueFromTitle={this.handleValueFromTitle}/>
                </StyledWrapper>
            );
        }

        if (this.state.backTo2State) {
            return (
                <StyledWrapper>
                    <StyledTitle>Add New Advert</StyledTitle>
                    <SecondPage backTo1Page={this.handleBackToPage1}
                                toPage3={this.handleToPage3}
                                categoryValue={this.handleValueFromCategory}
                                subcategoryValue={this.handleValueFromSubcategory}/>
                </StyledWrapper>
            );
        }

        if (this.state.backTo3State) {
            return (
                <StyledWrapper>
                    <StyledTitle>Add New Advert</StyledTitle>
                    <ThirdPage backTo2Page={this.handleBackToPage2}
                                toPage4={this.handleToPage4}
                                textareaValue={this.handleValueFromDesc}
                                priceValue={this.handleValueFromPrice}
                                districtValue={this.handleValueFromDistrict}
                                citydistrictValue={this.handleValueFromCityDistrict} />
                </StyledWrapper>
            );
        }

        if (this.state.backTo4State) {
            return (
                <StyledWrapper>
                    <StyledTitle>Add New Advert</StyledTitle>
                    <FourthPage backTo3Page={this.handleBackToPage3}
                                toPage5={this.handleToPage5} />
                </StyledWrapper>
            );
        }

        return (
            <StyledWrapper>
                <StyledTitle>Add New Advert</StyledTitle>
                <FirstPage toPage2 = {this.handleToPage2}
                           getValueFromTitle={this.handleValueFromTitle}/>
            </StyledWrapper>
        );
      }
}

export default AddNewAdvertPage;