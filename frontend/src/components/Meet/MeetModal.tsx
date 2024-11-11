import React from 'react';
import { MeetModalProps } from '@/models/meet';
import * as M from '../Style/Meet/MeetModal.styled';
import modalWarningImg from '../../assets/icons/modal_warning.svg';
import BaseButton from '../common/BaseButton';
import { colors } from '@/styles/colorPalette';

const MeetModal = ({ onConfirm, onCancel, title, content }: MeetModalProps) => {
  return (
    <M.Overlay>
      <M.ModalContainer>
        <M.IconContainer>
          <img src={modalWarningImg} alt="icon" />
        </M.IconContainer>
        <M.Title>{title}</M.Title>
        <M.Content>{content}</M.Content>
        <M.ButtonContainer>
          <BaseButton
            size="large"
            style={{ backgroundColor: `${colors.grey1}` }}
            onClick={onCancel}
          >
            취소
          </BaseButton>

          <BaseButton size="large" style={{ margin: '' }} onClick={onConfirm}>
            확인
          </BaseButton>
        </M.ButtonContainer>
      </M.ModalContainer>
    </M.Overlay>
  );
};

export default MeetModal;
