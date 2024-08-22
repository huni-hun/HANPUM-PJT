import Text from './Text';

function Message({
  text,
  hasError,
}: {
  text: string | null;
  hasError?: boolean;
}) {
  const labelColor = hasError ? 'red' : 'grey2';
  return (
    <Text
      $typography="t10"
      display="inline-block"
      color={labelColor}
      style={{ marginBottom: 24, marginTop: 4 }}
    >
      {text}
    </Text>
  );
}

export default Message;
