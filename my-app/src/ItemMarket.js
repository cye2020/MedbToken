import React, { useState } from 'react';
import { ethers } from 'ethers';
import logo from './logo.svg';

const ItemMarket = () => {


    return (
        <selection class="top_selection">
            <header class="header">
            <a href="/">
                <img src={ logo } alt="Logo" class="logo_img"/>
            </a>
            <form action="#" class="header_form">
                <div>
                    <ul id="headerSelectul">
                        <li data-val="account" class="on">계정</li>
                        <li data-val="money">게임머니</li>
                        <li data-val="item">아이템</li>
                    </ul>
                </div>
                <div class="header_input_wrap">
                    <input id="seach" type="text" class="header_input" autocomplete="off"/>
                    <ul class="header_search_list"></ul>
                </div>
                <div alt="검색버튼" class="search_img"></div>
            </form>
            <ul class="header_ul">
                                    <li>
                        <a href="/auth/login"><img src="/static/img/new/common/enter.png" alt="로그인"/>
                            <p class="login_text">로그인</p>
                        </a>
                    </li>
                    <li>
                        <a href="/auth/join"><img src="/static/img/new/common/refer.png" alt="회원가입"/>
                            <p>회원가입</p>
                        </a>
                    </li>
                                <li>
                    <a href="/service"><img src="/static/img/new/common/support.png" alt="고객센터"/>
                        <p>고객센터</p>
                    </a>
                </li>
            </ul>
        </header>
        </selection>
    )
}
