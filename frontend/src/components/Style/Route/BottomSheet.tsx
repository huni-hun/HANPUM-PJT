import * as R from '@/components/Style/Route/RouteBottom.styled';

interface BottomSheetProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function BottomSheet(props: BottomSheetProps) {
  const closeHandler = () => {
    props.setIsOpen(false);
  };

  return (
    <R.Container onClick={closeHandler}>
      <R.BottomSheetContainer></R.BottomSheetContainer>
    </R.Container>
  );
}

export default BottomSheet;
