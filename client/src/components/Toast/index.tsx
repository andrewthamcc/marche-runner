import React from "react";
import { connect } from "react-redux";
import ReactDOM from "react-dom";

// components
import Icon, { iconType, iconColor } from "../../components/Icon";
import Symbol, { symbolType } from "../../components/Symbol";

// redux actions
import { hideToast, toastType } from "../../actions/ui";

require("./style.scss");

interface OwnProps {}

interface ReduxStateProps {
  displayToast: boolean;
  message: string;
  type: toastType;
}

interface ReduxDispatchProps {
  hideToast: () => void;
}

type Props = OwnProps & ReduxStateProps & ReduxDispatchProps;

const ToastNotification: React.FC<Props> = (props: Props): JSX.Element => {
  // props
  const { displayToast, hideToast, message, type } = props;

  const renderSymbol = () => {
    switch (type) {
      case toastType.error:
        return symbolType.error;
      case toastType.success:
        return symbolType.checkmark;
      case toastType.warning:
        return symbolType.warning;
      default:
        return;
    }
  };

  const renderToast = () => {
    return (
      <div className={`toast ${displayToast ? "fadeIn" : "fadeOut"}`}>
        <div className="toast-wrapper">
          {type && (
            <Symbol symbolType={renderSymbol()} className="toast-symbol" />
          )}
          <p className="toast-message">{message}</p>
          <span className="toast-close" onClick={() => hideToast()}>
            <Icon iconType={iconType.close} color={iconColor.grey} />
          </span>
        </div>
      </div>
    );
  };

  const toastPortal = document.querySelector("#toast-portal");

  return displayToast && ReactDOM.createPortal(renderToast(), toastPortal);
};

const mapStateToProps = (state) => ({
  displayToast: state.uiState.displayToast,
  type: state.uiState.toastType,
  message: state.uiState.toastMessage,
});

export default connect(mapStateToProps, { hideToast })(ToastNotification);
