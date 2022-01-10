import React, { useState } from 'react';
import Axios from 'axios';
import data from '../../dummyfiles/dummyFeedList';
import { FaUserCheck } from 'react-icons/fa';
import userImage from '../../assets/images/defaultUserImage.png';
import { NoticeModal } from '../NoticeModal/NoticeModal'
import {
  FeedContentContainer,
  UserInfoContainer,
  UserInfo,
  UserNameAndImage,
  UserImageContainer,
  UserImage,
  DefaultUserImage,
  UserNickName,
  UserFollowIcon,
  PostCreatedAt,
  ContentsContainer,
  Sentence,
  Comment,
  BookInfo
} from './FollowfeedStyle';

export const Followfeed = ({ followFeedList }) => {
  
  // 팔로우 취소 버튼 클릭시 알람 모달 오픈
  const [isOpen, setInOpen] = useState(false)
  const [followInfo, setFollowInfo] = useState({
    id: 0,
    userId: '',
    userNickName: '',
    userImage: '',
  })

  // const [followFeedList, setFoolowFeedList] = useState({
  //   'Articles.user_Id': 0,
  //   'Articles.book_Title': '',
  //   'Articles.book_Author': '',
  //   'Articles.book_Thumbnail': '',
  //   'Articles.book_Publisher': '',
  //   'Articles.sentense': '',
  //   'Articles.comment': '',
  //   'Articles.createdAt': '',
  //   'Follows.user_Id': 0, // 피드 작성자가 팔로우 한 아이디
  //   'Follows.follow_Id': 0 // 피드 작성자 아이디 = id
  // })

  // const followInfoProps = (el) => {
  //   setFollowInfo({
  //     id: el.id,
  //     userId: el.userId,
  //     userNickName: el.userNickName,
  //     userImage: el.userImage
  //   })
  // }

  const NoticeModalOpenHandler = () => {
    setInOpen(!isOpen)
  }
  // 팔로우 상태로 관리하게되면 클릭시 일괄적용되기 때문에
  // 개별로 접근해서 팔로우상태를 변경하는 함수가 필요함
  // const getFollowFeedList = () => {
  //   Axios.get(`http://localhost:4000/user/${userInfo.id}`, 
  //     {
  //       headers: { 'Contnet-Type': 'application/json' }
  //     })
  //     .then((data) => {
  //       setFoolowFeedList({
  //         'Articles.user_Id': data['Articles.user_Id'],
  //         'Articles.book_Title': data['Articles.book_Title'],
  //         'Articles.book_Author': data['Articles.book_Author'],
  //         'Articles.book_Thumbnail': data['Articles.book_Thumbnail'],
  //         'Articles.book_Publisher': data['Articles.book_Publisher'],
  //         'Articles.sentense': data['Articles.sentense'],
  //         'Articles.comment': data['Articles.comment'],
  //         'Articles.createdAt': data['Articles.createdAt'],
  //         'Follows.user_Id': data['Follows.user_Id'], // 피드 작성자가 팔로우 한 아이디
  //         'Follows.follow_Id': data['Follows.follow_Id'] // 피드 작성자 아이디 = id
  //       })
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })

  const followHandler = (e) => {
    // el의 key값에 접근해서 핸들러 함수를 실행하면 개별실행도 가능해짐.
    // 실행할 때 조건문으로 article의 id가
    // console.log(e.target.value);

    // 팔로우 추가될 때
    // else {
    //   Axios.post(`http://localhost:4000/follow/${userInfo.id}?${e.target.value}`,
    //   {
    //     headers: { 'Contnet-Type': 'application/json' }
    //   })
    //   .then((data) => {
    //     console.log(data)
    //   .catch((err) => {
    //     console.log(err)
    //   })
    // }
  };
  console.log("모달 오픈 상태", isOpen)
  // 팔로우 정보까지 서버에서 받아와야 팔로우 아이콘 기능구현이 가능함.
  // 팔로우 정보를 조회해서 팔로우 아이콘 클릭시마다 아이콘 변경해주는 함수와 함께 서버에 팔로우 삭제||등록 요청을 보내야 함.

  const feedList = followFeedList.map((el, index) => {
    return (

      <UserInfoContainer key={index}>
        <UserInfo>
          <UserNameAndImage>
            <UserImageContainer>
              {el.userImage.length === 0
                ? <UserImage src={el.userImage} />
                : <DefaultUserImage src={userImage} />} {/* 경로문제는 추후 수정 필요함 */}
            </UserImageContainer>
            <UserNickName>
              {el.userNickName}
            </UserNickName>
            <UserFollowIcon value={el.id} onClick={followHandler} onChange={(el) => setFollowInfo(el)}>
              {el['Articles.user_Id'] === el['Follows.follow_Id'] ? <FaUserCheck onClick={NoticeModalOpenHandler}/> : '팔로우'}
            </UserFollowIcon>
          </UserNameAndImage>
          <PostCreatedAt>
            {el['Articles.createdAt']}
          </PostCreatedAt>
        </UserInfo>
        <ContentsContainer>
          <Sentence>{el['Articles.sentense']}</Sentence>
          <Comment>{el['Articles.comment']}</Comment>
          <BookInfo>{el['Articles.book_Title']} | {el['Articles.book_Author']} </BookInfo>
        </ContentsContainer>
      </UserInfoContainer>
    );
  });


  // 유저페이지가 만들어졌으면 검색한 결과가 없습니다는 검색 결과창에서 팝업되어야 함.
  return (
    <>
      <FeedContentContainer>
        {isOpen ? <NoticeModal NoticeModalOpenHandler={NoticeModalOpenHandler}/> : null}
        {followFeedList.length === 0
          ? <div>검색한 결과가 없습니다.</div>
          : <>
            {feedList}
          </>}
      </FeedContentContainer>
    </>
  );
};
