function Footer(props) {
    return (
        <div style={{marginTop:'150px'}}>
            <hr/>
            <div className="row w-100">
                <div className="col-1"></div>
                <div className="col-8">
                    <div className="row">
                        <div className="">{'(주)더존비즈온'}</div>
                        <div className="ml-3">대표: 김더존</div>
                        <div className="ml-3">TEL: 02.1234.1234</div>
                        <div className="ml-3">FAX: 02.5678.5678</div>
                        <div className="ml-3">상담문의: 1688-0000</div>
                        <div className="ml-3">고객센터: 1688-0001</div>
                    </div>
                    <div className="row">
                        <div className="">사업자등록번호:134-11-11111</div>
                        <div className="ml-3">통신판매신고번호:제2011-강원춘천-0001호</div>
                    </div>
                    <div className="row">
                        <div className="">더존을지타워: 서울특별시 중구 을지로1가 87 {'(도로명: 중구 을지로 29)'}</div>
                        <div className="ml-3">더존강촌캠퍼스: 강원도 춘천시 남산면 수동리 749 {'(도로명:춘천시 남산면 버들1길 130)'}</div>
                    </div>
                    <div className="row">
                        <div className="">Copyright ⓒ 2015 DOUONE ICT GROUP.ALL rights reserved.</div>
                    </div>
                </div>
                <div className="col-2">
                    <img src="http://localhost:3000/footerimg.png" alt="" width="" height="100"/>
                </div>
                <div className="col-1"></div>
            </div>
        </div>
    );
}

export default Footer;