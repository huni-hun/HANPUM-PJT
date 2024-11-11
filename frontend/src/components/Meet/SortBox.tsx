import styled from 'styled-components';
import Icon from '../common/Icon/Icon';
import Flex from '../common/Flex';
import Text from '../common/Text';
import { sortList } from '@/constants';
import { colors } from '@/styles/colorPalette';
import { MeetRequestDto } from '@/models/meet';

function SortBox({
  onClick,
  sortState,
  clickSort,
}: {
  onClick: () => void;
  sortState: MeetRequestDto;
  clickSort: (stateValue: string) => void;
}) {
  return (
    <SortBoxContainer>
      <div className="black-bg">
        <div className="container">
          <Icon
            name="IconSortModalClose"
            style={{ position: 'absolute', top: '35px', left: '24px' }}
            onClick={onClick}
          />
          <Flex direction="column">
            <Flex $justify="center" style={{ marginBottom: '28px' }}>
              <Text $typography="t20" $bold={true}>
                정렬
              </Text>
            </Flex>

            <Flex direction="column" $gap={30} style={{ marginTop: '7px' }}>
              {sortList.map((sortOption) => (
                <Flex
                  key={sortOption.label}
                  $justify="space-between"
                  onClick={() => clickSort(sortOption.value)}
                >
                  <Text
                    $typography="t14"
                    color={
                      sortState.pageable.sort === sortOption.value
                        ? 'main'
                        : 'black'
                    }
                  >
                    {sortOption.label}
                  </Text>
                  {sortState.pageable.sort === sortOption.value && (
                    <Icon name="IconSortModalCheck" />
                  )}
                </Flex>
              ))}
            </Flex>
          </Flex>
        </div>
      </div>
    </SortBoxContainer>
  );
}

export default SortBox;

const SortBoxContainer = styled.div`
  width: 100%;
  background-color: pink;
  .black-bg {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.45);
    z-index: 10;

    .container {
      position: fixed;
      bottom: 0px;
      background-color: ${colors.white};
      border-radius: 12px 12px 0 0;
      z-index: var(--alert-zindex);
      width: 100%;
      overflow: hidden;
      padding: 28px 30px 50px;
      box-sizing: border-box;
      background-color: ${colors.white};
      box-shadow:
        rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
        rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
      background-color: ${colors.white};
    }
  }
`;
