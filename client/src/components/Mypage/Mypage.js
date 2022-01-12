import React, { useCallback, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';
import { UserModifyModal } from '../UserInfoModify/UserModifyModal';
import { SetenceModal } from '../SentenceModal/SentenceModal';
import { data } from '../../dummyfiles/dummyMyFeedList';
import example from '../../assets/images/defaultUserImage.png'

import {
  MyPageWholeContainer,
  MypageContainer,
  UserInfoContainer,
  UserImgSection,
  UserImage,
  UserInfoSection,
  NickNameFollowSection,
  NickName,
  FollowContainer,
  Follow,
  FollowCount,
  Follower,
  FollowerCount,
  UserModifyBtn,
  ArticleListTitle,
  ArticleListContainer,
  ArticleWrap,
  Article
} from './MypageStyle';

axios.defaults.withCredentials = true;

export default function MyPage () {
  // 1. 상태관리 요소 : userImage, userNickName, article, follow, follower
  // 2. follow, follower : 서버에 count 요청
  // 3. 함수 :
  // 3-1. 회원정보수정 버튼을 누를 시 회원정보수정 모달로 연결, 무한스크롤 관련 버튼 실행 또는 액션,
  // 3-2. 아티클 map으로 출력하기 -> 무한스크롤로 아티클 노출
  // 3-3. 책 썸네일을 누르면 Sentence Modal이 팝업
  // 4. 렌더링 : MyPage 접속한 경우, 새로운 article이 생길 경우 -> 회원 정보 조회 GET으로 가져오기

  // axios로 회원 정보 조회(유저 정보 및 아티클)
  // http://localhost:4000/user/:userId

  const userState = useSelector(state => state.userInfoReducer);
  const { userInfo } = userState;

  const [isGuest, setIsGuest] = useState({
    id: 0,
    userId: 'guest',
    userNickName: 'guset',
    userImage: ''
  })
  const [myUserInfo, setMyUserInfo] = useState({
    id: 0,
    userId: '',
    userNickName: '',
    userImage: ''
  });
  const [follow, setFollow] = useState({
    following: 0,
    follower: 0
  });
  const [myArticleList, setMyArticleList] = useState([]);
  const [isOpneModifyModal, setIsOpenModifyModal] = useState(false);
  const [isOpenSentenceModal, setIsOpenSentenceModal] = useState(false);
  const history = useHistory();

  const [page, setPage] = useState(0); // 무한 스크롤시 페이지 필요
  const [loading, setLoading] = useState(false);
  const [ref, inView] = useInView(); // react-intersection-observer -> div가 viewport에 보여질 때 inView 값이 true

  // 회원정보수정 버튼 누르면 회원정보수정 모달이 나오는 함수
  const userInfoModifyBtnHandler = () => {
    setIsOpenModifyModal(!isOpneModifyModal);
  };
  // 회원정보수정 모달 창을 닫는 버튼(x) 함수
  const closeUserInfoModify = () => {
    setIsOpenModifyModal(!isOpneModifyModal);
  };

  // 북 썸네일을 누르면 SentenceModal이 나오는 함수
  const openSentenceModalHandler = (el) => {
    setIsOpenSentenceModal(!isOpenSentenceModal);
    history.push({
      state: {
        articleInfo : {
        id: el.id,
        userNickName: el['User.userNickName'],
        userImage: el['User.userImage'],
        book_Title: el.book_Title,
        book_Author: el.book_Author,
        book_Publisher: el.book_Publisher,
        sentence: el.sentence,
        comment: el.comment,
        createdAt: el.createdAt,
      }}
    })
  }

  // 내 정보 전체를 조회하는 함수 (무한 스크롤 적용)
  const getMyInfoAll = useCallback(() => {
    setLoading(true)
    setTimeout(() => {
      axios
      .get(`http://localhost:4000/user/${userInfo.id}?page=${page}`,
        {
          headers: { 'Content-Type': 'application/json' }
        })
      .then((res) => {
        console.log(res.data)
        setMyArticleList(myArticleList => [...myArticleList, ...res.data.articleData.rows])
        setMyUserInfo({
          id: res.data.userInfo.id,
          userId: res.data.userInfo.userId,
          userNickName: res.data.userInfo.userNickName,
          userImage: res.data.userInfo.userImage
        })
        setFollow({
          following: res.data.follow.following,
          follower: res.data.follow.follower
        })
      })
    }, 1000)
    setLoading(false)
  }, [page])

  // `getArticleList` 가 바뀔 때 마다 함수 실행
  useEffect(() => {
    getMyInfoAll()
  }, [getMyInfoAll])

  useEffect(() => {
    // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
    if (inView && !loading) {
      setPage(prevState => prevState + 1)
    }
  }, [inView, loading])


  console.log('아티클 목록',myArticleList);
  const myArticles = myArticleList.map((el, index) => {
    return (
      <ArticleWrap key={index}>
        <Article
          src={el.book_Thumbnail}
          onClick={() => openSentenceModalHandler(el)}
        />
      </ArticleWrap>
    );
  });

  return (
    // react suspence hook (데이터가 없을 경우, 로딩 화면) 삼항 연산자로 getUserInfoAll 함수 처리
    <>
    <MyPageWholeContainer>
      <MypageContainer> 
        {isOpneModifyModal
          ? <UserModifyModal
            userInfoModifyBtnHandler={userInfoModifyBtnHandler}
            closeUserInfoModify={closeUserInfoModify}
            myUserInfo={myUserInfo}
            />
          : null}
        {isOpenSentenceModal
          ? <SetenceModal
            openSentenceModalHandler={openSentenceModalHandler}
            
            />
          : null}  
        <UserInfoContainer>
          <UserImgSection>
            <UserImage src={'../../assets/images/defaultUserImage.png'} />
          </UserImgSection>
          <UserInfoSection>
            <NickNameFollowSection>
              <NickName>{myUserInfo.userNickName}</NickName>
              <FollowContainer>
                <Follow>팔로우
                  <FollowCount>{follow.following}</FollowCount>
                </Follow>
                <Follower>팔로워
                  <FollowerCount>{follow.follower}</FollowerCount>
                </Follower>
              </FollowContainer>
            </NickNameFollowSection>
            <UserModifyBtn
              onClick={userInfoModifyBtnHandler}
            >
              회원정보수정
            </UserModifyBtn>
          </UserInfoSection>
        </UserInfoContainer>
        {/* <ArticleListTitle>목록</ArticleListTitle> */}
        <ArticleListContainer>
          {myArticles}
        </ArticleListContainer> 
        <div ref={ref}></div>
      </MypageContainer>
    </MyPageWholeContainer>
    </>
  );
}
