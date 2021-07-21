import Footer from "../Main/Footer";
import  Button  from "../common/Button";
function Page403(props) {
    const toMain = () =>{
        props.history.push("/");
    }

    const toBefore = () =>{
        props.history.goBack();
    }

    return(
        <>
         <div style={{width:"100%", height:"100%", backgroundColor:"white",  marginTop:"4%"}} >
            <img src="/douzone_mark.PNG" width="250px" height="50px" style={{marginLeft:"10%", marginTop:"5.5%"}} alt=""/>
        </div>
        <div className="d-flex flex-row" style={{width:"100%", height:"100%", backgroundColor:"white"}} >
            <div style={{marginLeft:"10%", marginTop:"4%"}}>
                <h2 style={{marginBottom:"9%"}}>죄송합니다. 접근 권한이 없습니다.</h2>
                <h4>작업하시려는 기능에 대해 권한이 없습니다,</h4>
                <h4 style={{marginBottom:"6%"}}>로그인 하신 계정이 기능의 권한에 대해 맞는 계정이신지 확인해주시기 바랍니다.</h4>
                <h3 style={{marginBottom:"3.5%"}}>감사합니다.</h3>
                <Button onClick={toMain} style={{width:"200px", marginRight:"2%", marginBottom:"5%"}}>메인으로</Button>
                <Button onClick={toBefore} style={{width:"200px"}}>이전으로</Button>
            </div>
            <div><img src="/douzone_background.PNG" width="800px" height="400px" style={{marginLeft:"15%", marginTop:"1%",  marginBottom:"14%"}} alt=""/></div>
        </div>
        <Footer />

        </>
    );
}

export default Page403;