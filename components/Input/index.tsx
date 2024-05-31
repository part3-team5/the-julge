import { InputProps } from "@/types/InputTypes";
import styled from "@emotion/styled";

export default function Input({
  label,
  type = "text",
  value,
  error,
  register,
}: InputProps) {
  const hasError: boolean = !!error;

  return (
    <InputWrapper>
      <StyledLabel>{label}</StyledLabel>
      <StyledInput
        type={type}
        value={value}
        placeholder="입력"
        hasError={hasError}
        {...register}
      />
      {error && <StyledWarning>{error.message}</StyledWarning>}
    </InputWrapper>
  );
}

const commonStyles = `
color: var(--The-julge-black);
font-family: Abel;
font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: 26px;
  color: var(--The-julge-black);
  font-family: Abel;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 26px;
`;

const InputWrapper = styled.div`
  display: flex;
  width: 350px;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;

const StyledInput = styled.input<{ hasError: boolean }>`
  ${commonStyles}
  display: flex;
  padding: 16px 20px;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
  border-radius: 6px;
  border: 1px solid
    ${({ hasError }) =>
      hasError ? "var(--The-julge-red)" : "var(--The-julge-gray-30)"};
  background: var(--The-julge-white);
  ::placeholder {
    color: var(--The-julge-gray-40);
  }
`;
const StyledLabel = styled.label`
  ${commonStyles}
`;
const StyledWarning = styled.span`
  display: flex;
  padding-left: 8px;
  align-items: flex-start;
  gap: 8px;
  color: var(--The-julge-red);
  font-size: 12px;
  font-family: Abel;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
`;
