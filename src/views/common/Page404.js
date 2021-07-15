import Footer from "../Main/Footer";
import  Button  from "../common/Button";
function Page404(props) {

    const toMain = () =>{
        props.history.push("/");
    }

    const toBefore = () =>{
        props.history.goBack();
    }

    return(
        <>
         <div style={{width:"100%", height:"100%", backgroundColor:"white",  marginTop:"4%"}} >
            <img src="http://localhost:3000/douzone_mark.PNG" width="250px" height="50px" style={{marginLeft:"10%", marginTop:"5.5%"}} alt=""/>
        </div>
        <div className="d-flex flex-row" style={{width:"100%", height:"100%", backgroundColor:"white"}} >
            <div style={{marginLeft:"10%", marginTop:"4%"}}>
                <h2 style={{marginBottom:"9%"}}>죄송합니다. 요청하신 페이지를 찾을 수 없습니다.</h2>
                <h4>방문하시려는 페이지의 주소가 잘못 입력되었거나,</h4>
                <h4>페이지의 주소가 변경 혹은 삭제되어 요청하신 페이지를 찾을 수 없습니다.</h4>
                <h4 style={{marginBottom:"6%"}}>입력하신 주소가 정확한지 다시 한번 확인해 주시기 바랍니다.</h4>
                <h3 style={{marginBottom:"3.5%"}}>감사합니다.</h3>
                <Button onClick={toMain} style={{width:"200px", marginRight:"2%", marginBottom:"5%"}}>메인으로</Button>
                <Button onClick={toBefore} style={{width:"200px"}}>이전으로</Button>
            </div>
            <div><img src="http://localhost:3000/douzone_background.PNG" width="800px" height="400px" style={{marginLeft:"15%", marginTop:"1%",  marginBottom:"14%"}} alt=""/></div>
        </div>
        <Footer />

        </>
    );
}

export default Page404;