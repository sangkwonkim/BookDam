import styled from 'styled-components';

export const FixedContainer = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
`;

export const WriteWholeContainer = styled.div`
  padding-top: 100px;
  border: 1px solid #e9ecef;
  overflow: hidden;
  /* position: relative; */
  /* height: 900px; */
  height: 100vh;
  width: 100vw;
`;

export const SearchBookWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* border-top: 1px solid black; */
  height: 30%;
`;

export const SearchBookContainer = styled.div`
  width: 970px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  /* border: 1px solid blue; */
`;

export const SearchBookInfoContainer = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* border: 1px solid black; */
`;

export const SearchBookInfoUpper = styled.div`
  width: 100%;
  height: 30%;
  /* border: 2px solid black; */
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SearchContainer = styled.div`
  width: 80%;
  /* border: 1px solid black; */
  height: 60%;
  display: flex;
  justify-content: center;
`;

export const SearchInputcontainer = styled.input.attrs({
  placeholder: '책, 저자 입력'
})`
  width: 100%;
  border: 4px solid #e5e5e5;
  outline: none;
  font-size: 1rem;
  font-weight: 600;
  padding-left: 10px;
`;

export const SearchClick = styled.div`
  width: 50px;
  /* border: 1px solid black; */
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #e5e5e5;
  cursor: pointer;
  font-weight: 600;
`;

export const SearchBookInfoLower = styled.div`
  width: 100%;
  height: 70%;
  margin-top: 20px;
  /* border: 1px solid black; */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const SearchBookTitleContainer = styled.div`
  width: 80%;
  height: 33%;
  /* border: 1px solid black; */
  /* font-size: 18px; */
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  @media screen and (max-width: 500px) {
    font-size: 15px;
  }
`;

export const BookTitleLeftContainer = styled.div` //도서명, 저자, 출판사 태그
  width: 60px;
  height: 33%;
  /* border: 1px solid black; */
  font-size: 18px;
  font-weight: 600;
  text-align: left;

  @media screen and (max-width: 500px) {
    font-size: 15px;
  }
  
`;

export const BookTitleRightContainer = styled.div`
  width: 80%;
  height: 100%;
  margin-left: 10px;
  /* border: 1px solid black; */
  font-size: 18px;
  font-weight: 600;
  overflow: hidden;

  @media screen and (max-width: 500px) {
    font-size: 15px;
  }
`;

export const SearchBookAuthorContainer = styled.div`
  width: 80%;
  height: 33%;
  /* border: 1px solid black; */
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const BookAuthorRightContainer = styled.div`
  width: 80%;
  height: 33%;
  margin-left: 10px;
  /* border: 1px solid black; */
  font-size: 18px;
  font-weight: 600;

  @media screen and (max-width: 500px) {
    font-size: 15px;
  }
`;

export const SearchBookPublisherContainer = styled.div`
  width: 80%;
  height: 33%;
  /* border: 1px solid black; */
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const BookPublisherRightContainer = styled.div`
  width: 80%;
  height: 33%;
  margin-left: 10px;
  /* border: 1px solid black; */
  font-size: 18px;
  font-weight: 600;

  @media screen and (max-width: 500px) {
    font-size: 15px;
  }
`;

export const SearchBookImageContainer = styled.div`
  width: 40%;
  height: 100%;
  /* border: 1px solid black; */
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BookThumbnailContainer = styled.div`
  margin: 0;
  width: 60%;
  height: 90%;
  /* border: 1px solid black; */
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0;
  box-sizing: border-box;
`;

export const BookThumbnail = styled.img`
  border: 1px solid black;
  width: 70%;
  margin: 0;
  @media screen and (max-width: 500px) {
    width: 120%
  }
`;

export const WriteArticleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: 1px solid red; */
  height: 45%;
`;

export const WriteArticleContainer = styled.div`
  width: 970px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  /* border: 1px solid black; */
`;

export const WriteTextLimitContainer = styled.div`
  /* border: 1px solid black; */
  width: 90%;
  height: 5%;
  display: flex;
  justify-content: flex-end;
`;

export const WriteTextLimitResult = styled.div`
  /* border: 1px solid black; */
  width: 40%;
  margin-right: 2px;
  font-size: 16px;
  font-weight: 600;
  color: gray;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;

  @media screen and (max-width: 500px) {
    font-size: 12px;
  }
`;

export const WriteSentenceSection = styled.textarea.attrs({
  placeholder: '감동적인 문장을 기록하세요.',
  maxLength: 301
})`
  margin-bottom: 20px;
  width: 90%;
  height: 50%;
  border: thick double #5dc175;
  padding: 20px;
  border-radius: 7px;
  font-size: 20px;
  box-sizing: border-box;
`;

export const WriteCommentSection = styled.textarea.attrs({
  placeholder: '문장에 대한 감상평을 남기세요.',
  maxLength: 301
})`
  /* margin: 10px; */
  width: 90%;
  height: 50%;
  border: thick double #5dc175;
  padding: 20px;
  border-radius: 7px;
  font-size: 20px;
  box-sizing: border-box;
`;

export const ArticleButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: 1px solid red; */
  height: 10%;
`;
export const ArticleButtonContainer = styled.div`
  width: 970px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: 1px solid blue; */
`;
export const ArticleButtonSection = styled.div`
  /* border: 1px solid red; */
  width: 90%;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const ButtonContainer = styled.div`
  margin: 5px;
  /* border: 2px solid red; */
  width: 350px;
  height: 55px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
export const ButtonsInWrite = styled.button`
  width: 150px;
  height: 40px;
  background-color: #1dc078;
  color: white;
  cursor: pointer;
  display: inline-block;
  font-family: Inter,-apple-system,system-ui,Roboto,"Helvetica Neue",Arial,sans-serif;
  line-height: 44px;
  outline: 0;
  overflow: hidden;
  padding: 0 20px;
  pointer-events: auto;
  text-align: center;
  touch-action: manipulation;
  user-select: none;
  -webkit-user-select: none;
  vertical-align: top;
  white-space: nowrap;
  border: 0;
  margin: 10px;
  font-weight: 600;
  font-size: 20px;
  border-radius: 5px;
  
  &:hover {
  background: #00bd68;
  }
`;
