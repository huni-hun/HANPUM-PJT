import React, { useState } from 'react';
import Icon from '@/components/common/Icon/Icon';
import * as R from '@/components/Style/Route/RouteBottom.styled';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { colors } from '@/styles/colorPalette';

interface BottomSheetProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  bsType: string;
  bsTypeText: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  selected: string;
  route?: string;
  onEdit?: () => void;
  onDelete?: () => void;
  /** 모임 내보내기  */
  onExport?: () => void;
  id?: number;
  writeState?: boolean;
}

function BottomSheet(props: BottomSheetProps) {
  const [isToggleOpen, setIsToggleOpen] = useState<boolean>(false);
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const navigate = useNavigate();
  /** 모임 - 그룹아이디 */
  const location = useLocation();
  const { groupId } = location.state || {};

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      props.setIsOpen(false);
    }, 280);
  };

  type IconName =
    | 'IconMemberBlack'
    | 'IconListManage'
    | 'IconDeleteBlack'
    | 'IconRetouch'
    | 'IconMeetExport'
    | 'IconLockBlack'
    | 'IconGreenChecked'
    | undefined;

  /** 각 sheet 항목들의 아이콘들 */
  const getIconName = (
    option: string,
    isSelected?: boolean,
  ): IconName | null => {
    if (
      props.route === '경로정렬' &&
      (option === '최신순' || option === '좋아요순' || option === '등록순')
    ) {
      return isSelected ? 'IconGreenChecked' : null;
    }

    switch (option) {
      case '멤버관리':
        return 'IconMemberBlack';
      case '가입 신청 관리':
        return 'IconListManage';
      case '삭제':
        return 'IconDeleteBlack';
      case '수정':
        return 'IconRetouch';
      case '내보내기':
        return 'IconMeetExport';
      case '공개 여부':
        return 'IconLockBlack';
      default:
        return null;
    }
  };

  /** sheet에 있는 항목 click 할 때 넘겨주는 것들 */
  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    if (
      props.route === '경로정렬' &&
      (option === '최신순' || option === '좋아요순' || option === '등록순')
    ) {
      return;
    }

    switch (option) {
      case '수정':
        // if (props.onEdit) props.onEdit();
        if (props.onEdit && props.writeState) {
          props.onEdit();
        } else {
          props.setIsOpen(false);
          toast.error('수정권한이 없습니다.');
        }
        break;
      case '삭제':
        if (props.onDelete && props.writeState) props.onDelete();
        else {
          props.setIsOpen(false);
          toast.error('삭제권한이 없습니다.');
        }

        break;
      case '공개 여부':
        break;
      case '멤버관리':
        navigate('/meet/memberMangeList', {
          state: { groupId },
        });
        break;

      case '가입 신청 관리':
        navigate('/meet/requestManageList', {
          state: { groupId },
        });
        break;
      case '내보내기':
        if (props.onExport) props.onExport();
        else {
          props.setIsOpen(false);
          toast.error('내보내기 권한이 없습니다.');
        }
        break;
      default:
        break;
    }
  };

  /** sheet에 들어가는 항목들 */
  const getSettingContent = () => {
    if (props.route === '일정') {
      return ['수정', '삭제'];
    }
    if (props.route === '경로설정') {
      return ['공개 여부', '수정', '삭제'];
    }
    if (props.route === '경로정렬') {
      return ['최신순', '좋아요순', '등록순'];
    }
    if (props.route === '모임필터') {
      return ['멤버관리', '가입 신청 관리', '수정', '삭제'];
    }
    if (props.route === '모임관리') {
      return ['내보내기'];
    }
    return [];
  };

  const settingContent = getSettingContent();

  /** 특정 옵션 가져오기 */
  const isSpecialOption = (option: string) => {
    return ['최신순', '좋아요순', '등록순'].includes(option);
  };

  const BottomSheetMain = () => {
    switch (props.bsType) {
      case '일정':
      case '경로설정':
      case '경로정렬':
      case '모임필터':
      case '모임관리':
        return (
          <R.BottomSheetMain>
            {settingContent.map((ele) => {
              const isSelected = selectedOption === ele;
              const iconName = getIconName(ele, isSelected);
              const isSpecial = isSpecialOption(ele);

              return (
                <R.SettingBox
                  key={ele}
                  onClick={() => {
                    handleOptionClick(ele);
                    setSelectedOption(ele);
                    props.setSelected(ele);
                  }}
                >
                  <R.SettingIconBox isNoIcon={isSpecial}>
                    {!isSpecial && iconName && (
                      <Icon name={iconName} size={20} />
                    )}
                    {props.route === '경로정렬' && isSpecial && isSelected && (
                      <Icon name="IconGreenChecked" size={20} />
                    )}
                  </R.SettingIconBox>

                  <R.SettingTextBox
                    onClick={() => {}}
                    isDelete={ele === '삭제'}
                    style={{
                      color:
                        ele === '삭제'
                          ? colors.red
                          : isSpecial && isSelected
                            ? colors.main
                            : 'inherit',
                    }}
                  >
                    {ele}
                  </R.SettingTextBox>
                  <R.SettingIconBox>
                    {props.route === '경로정렬' &&
                      (ele === '최신순' ||
                        ele === '좋아요순' ||
                        ele === '등록순') &&
                      isSelected && <Icon name="IconGreenChecked" size={20} />}
                  </R.SettingIconBox>
                  {ele === '공개 여부' && (
                    <R.SwitchLabel isOpen={isToggleOpen}>
                      <R.SwitchInput
                        type="checkbox"
                        checked={isToggleOpen}
                        onChange={() => setIsToggleOpen(!isToggleOpen)}
                      />
                      <R.SwitchButton isOpen={isToggleOpen} />
                    </R.SwitchLabel>
                  )}
                </R.SettingBox>
              );
            })}
          </R.BottomSheetMain>
        );
      default:
        return null;
    }
  };

  return (
    <R.Container
      onClick={(e) => {
        handleClose();
      }}
    >
      <R.BottomSheetContainer
        isClosing={isClosing}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <R.BottomSheetContentBox>
          <R.BottomSheetHeader>
            <R.HeaderIconBox
              onClick={() => {
                handleClose();
              }}
            >
              <Icon name="IconClose" size={15} />
            </R.HeaderIconBox>
            {props.bsTypeText}
          </R.BottomSheetHeader>
          {BottomSheetMain()}
        </R.BottomSheetContentBox>
      </R.BottomSheetContainer>
    </R.Container>
  );
}

export default BottomSheet;
