import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { data } from '../../dummyfiles/dummyBookSearch'; // 도서검색 테스트 위한 더미 데이터
import {
  WriteWholeContainer,
  SearchBookWrapper,
  SearchBookContainer,
  SearchBookInfoContainer,
  SearchBookInfoUpper,
  SearchContainer,
  SearchInputcontainer,
  SearchClick,
  SearchBookInfoLower,
  SearchBookTitleContainer,
  BookTitleLeftContainer,
  BookTitleRightContainer,
  SearchBookAuthorContainer,
  SearchBookPublisherContainer,
  SearchBookImageContainer,
  BookThumbnailContainer,
  BookThumbnail,
  WriteArticleWrapper,
  WriteArticleContainer,
  WriteSentenceSection,
  WriteCommentSection,
  ArticleButtonWrapper,
  ArticleButtonContainer,
  ArticleButtonSection,
  ButtonContainer,
  ButtonsInWrite
} from './WriteStyle';
import { GuestLoginModal } from '../GuestLoginModal/GuestLoginModal';
import { SignupModal } from '../Signup/SignupModal';
import { BookSearchModal } from '../BookSearchModal/BookSearchModal';
import { NoInputNoticeModal } from '../NoticeModal/WriteNoticeModal/NoInputNoticeModal';
import { SubmitConfirmModal } from '../NoticeModal/WriteNoticeModal/SubmitConfirmModal';

export const Write = () => {
  const state = useSelector(state => state.userInfoReducer); // 로그인 상태변경용
  const { isLogin, userInfo } = state; // 로그인 상태변경용
  const [isOpenLoginModal, setIsOpenLoginModal] = useState(false);
  const [isOpenSignupModal, setIsOpenSignupModal] = useState(false);
  const [isOpenBookSearchModal, setIsOpenBookSearchModal] = useState(false);
  const [isOpenNoticeModal, setIsOpenNoticeModal] = useState(false);
  const [isOpenSubmitModal, setIsOpenSubmitModal] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [searchData, setSearchData] = useState([]);
  const [selectedData, setSelectedData] = useState({
    title: '', author: '', publisher: '', image: ''
  });
  const [inputSentence, setInputSentence] = useState('');
  const [inputComment, setInputComment] = useState('');
  const history = useHistory();

  const handleInputValue = (e) => {
    setInputValue(e.target.value);
  };

  const bookSearch = () => { // 도서 검색 버튼
    if (inputValue) {
      setIsOpenBookSearchModal(true);
      document.body.style.overflow = 'hidden'; // 스크롤 방지 설정
      const resultData = data.filter((el) => {
        return el.title.includes(inputValue);
      });
      setSearchData(resultData);
    } else {
      setErrorMessage('검색어를 입력하세요.');
    }
  };

  const handleSelect = (idx) => { // 검색된 도서 선택하여 가져오기
    setInputValue('');
    // eslint-disable-next-line array-callback-return
    searchData.map((el, id) => {
      if (id === idx) {
        setSelectedData(el);
      }
    });
  };

  const handleInputSentence = (e) => {
    if (isLogin === false) {
      setIsOpenLoginModal(true);
    } else {
      setInputSentence(e.target.value);
    }
  };

  const handleInputComment = (e) => {
    if (isLogin === false) {
      setIsOpenLoginModal(true);
    } else {
      setInputComment(e.target.value);
    }
  };

  const handleLoginModal = () => { // 버튼 클릭시 로그인 모달 열기
    setIsOpenSignupModal(false);
    setIsOpenLoginModal(true);
    document.body.style.overflow = 'hidden'; // Login 모달창 열면서 스크롤 방지
  };

  const handleSignupModal = () => { // 버튼 클릭시 회원가입 모달 열기
    setIsOpenLoginModal(false);
    setIsOpenSignupModal(true);
    document.body.style.overflow = 'hidden'; // Signup 모달창 열면서 스크롤 방지
  };

  const handleCloseSignupModal = () => { // 버튼 클릭시 회원가입 모달 닫기
    setIsOpenSignupModal(false);
    document.body.style.overflow = 'unset';
  };

  const handleCloseNoticeModal = () => {
    setIsOpenNoticeModal(false);
    setIsOpenSubmitModal(false);
    document.body.style.overflow = 'unset';
  };

  const submitHandler = () => {
    if (selectedData.title === '' || inputSentence === '' || inputSentence === '') {
      setErrorMessage('내용을 입력하세요.');
      setIsOpenNoticeModal(true);
    } else {
      setErrorMessage('저장하시겠습니까?');
      setIsOpenSubmitModal(true);
      document.body.style.overflow = 'hidden';
    }
  };

  const handleSubmit = async () => {
    const submitData = {
      book_Title: selectedData.title,
      book_Author: selectedData.author,
      book_Thumbnail: selectedData.image,
      book_Publisher: selectedData.publisher,
      sentence: inputSentence,
      comment: inputComment
    };

    if (selectedData.title === '' || inputSentence === ' ' || inputComment === '') {
      setErrorMessage('내용을 입력하세요.');
      setIsOpenNoticeModal(true);
      document.body.style.overflow = 'hidden';
    } else {
      await axios({
        withCredentials: true,
        method: 'post',
        url: `http://localhost:4000/article/${userInfo.id}`,
        headers: {
          authorization: `Bearer: ${process.env.Client_Secret}`,
          'Content-Type': 'application/json'
        },
        data: {
          articleInfo: submitData
        }
      })
        .then((res) => {
          console.log(res.data.message);
          if (res.data.message === 'success') {
            console.log('저장이 완료되었습니다.');
            history.push('/feedPage');
          } else {
            console.log('정상적인 접근이 아닙니다.');
          }
        });
    }
  };

  return (
    <>
      <WriteWholeContainer>
        {isOpenLoginModal
          ? <GuestLoginModal
              setIsOpenLoginModal={setIsOpenLoginModal}
              handleSignupModal={handleSignupModal}
            />
          : null}

        {isOpenSignupModal
          ? <SignupModal
              handleCloseSignupModal={handleCloseSignupModal}
              handleLoginModal={handleLoginModal}
            />
          : null}

        {isOpenBookSearchModal
          ? <BookSearchModal
              handleSelect={handleSelect}
              searchData={searchData}
              setIsOpenBookSearchModal={setIsOpenBookSearchModal}
            />
          : null}

        {isOpenNoticeModal
          ? <NoInputNoticeModal errorMessage={errorMessage} handleCloseNoticeModal={handleCloseNoticeModal} />
          : null}

        {isOpenSubmitModal
          ? <SubmitConfirmModal errorMessage={errorMessage} handleSubmit={handleSubmit} handleCloseNoticeModal={handleCloseNoticeModal} />
          : null}
        <SearchBookWrapper>
          <SearchBookContainer>
            <SearchBookInfoContainer>
              <SearchBookInfoUpper>
                <SearchContainer>
                  <SearchInputcontainer value={inputValue} onChange={handleInputValue} />
                  <SearchClick onClick={bookSearch}>검색</SearchClick>
                </SearchContainer>
              </SearchBookInfoUpper>
              <SearchBookInfoLower>
                <SearchBookTitleContainer>
                  <BookTitleLeftContainer>도서명</BookTitleLeftContainer>
                  <BookTitleRightContainer>{selectedData.title}</BookTitleRightContainer>
                </SearchBookTitleContainer>
                <SearchBookAuthorContainer>
                  <BookTitleLeftContainer>저자명</BookTitleLeftContainer>
                  <BookTitleRightContainer>{selectedData.author}</BookTitleRightContainer>
                </SearchBookAuthorContainer>
                <SearchBookPublisherContainer>
                  <BookTitleLeftContainer>출판사</BookTitleLeftContainer>
                  <BookTitleRightContainer>{selectedData.publisher}</BookTitleRightContainer>
                </SearchBookPublisherContainer>
              </SearchBookInfoLower>
            </SearchBookInfoContainer>
            <SearchBookImageContainer>
              <BookThumbnailContainer>
                <BookThumbnail src={selectedData.image} />
              </BookThumbnailContainer>
            </SearchBookImageContainer>
          </SearchBookContainer>
        </SearchBookWrapper>

        <WriteArticleWrapper>
          <WriteArticleContainer>
            <WriteSentenceSection onChange={handleInputSentence} />
            <WriteCommentSection onChange={handleInputComment} />
          </WriteArticleContainer>
        </WriteArticleWrapper>

        <ArticleButtonWrapper>
          <ArticleButtonContainer>
            <ArticleButtonSection>
              <ButtonContainer>
                <ButtonsInWrite onClick={submitHandler}>저장하기</ButtonsInWrite>
              </ButtonContainer>
            </ArticleButtonSection>
          </ArticleButtonContainer>
        </ArticleButtonWrapper>
      </WriteWholeContainer>
    </>
  );
};
