import MessageModal from "../components/modals/MessageModal.js";

import HardResetModal from "../components/modals/prestige/HardResetModal.js";

import AnimationOptionsModal from "../components/modals/options/AnimationOptionsModal.js";
import AwayProgressOptionsModal from "../components/modals/options/AwayProgressOptionsModal.js";
import BackupWindowModal from "../components/modals/options/BackupWindowModal.js";
 import ConfirmationOptionsModal from "../components/modals/options/ConfirmationOptionsModal.js";
import HiddenTabsModal from "../components/modals/options/hidden-tabs/HiddenTabsModal.js";
import HotkeysModal from "../components/modals/options/HotkeysModal.js";
import InfoDisplayOptionsModal from "../components/modals/options/InfoDisplayOptionsModal.js";

import AutobuyerEditModal from "../components/modals/AutobuyerEditModal.js";
import AwayProgressModal from "../components/modals/AwayProgressModal.js";

import ChangelogModal from "../components/modals/ChangelogModal.js";
import CreditsModal from "../components/modals/CreditsModal.js";
import ImportSaveModal from "../components/modals/ImportSaveModal.js";
import LoadGameModal from "../components/modals/LoadGameModal.js";

import ChangePhoneModal from "../components/modals/prestige/ChangePhoneModal.js";

let nextModalID = 0;
export class Modal {
  constructor(component, priority = 0, closeEvent) {
    this._component = component;
    this._modalConfig = {};
    this._priority = priority;
    this._closeEvent = closeEvent;
  }

  // We can't handle this in the Vue components because if the modal order changes, all the event listeners from the
  // top modal end up getting removed from the EventHub due to the component being temporarily destroyed. This could
  // result in the component sticking around because an event it was listening for happened while it wasn't on top.
  applyCloseListeners(closeEvent) {
    // Most of the time the close event will be a prestige event, in which case we want it to trigger on all higher
    // prestiges as well
    const prestigeOrder = [GAME_EVENT.CHANGE_PHONE_AFTER];
    let shouldClose = false;
    for (const prestige of prestigeOrder) {
      if (prestige === closeEvent) shouldClose = true;
      if (shouldClose) EventHub.ui.on(prestige, () => this.removeFromQueue(), this._component);
    }

    // In a few cases we want to trigger a close based on a non-prestige event, so if the specified event wasn't in
    // the prestige array above, we just add it on its own
    if (!shouldClose) EventHub.ui.on(closeEvent, () => this.removeFromQueue(), this._component);
  }

  show(modalConfig) {
    if (!GameUI.initialized) return;
    this._uniqueID = nextModalID++;
    this._props = Object.assign({}, modalConfig || {});
    if (this._closeEvent) this.applyCloseListeners(this._closeEvent);
    if (modalConfig?.closeEvent) this.applyCloseListeners(modalConfig.closeEvent);

    const modalQueue = ui.view.modal.queue;
    // Add this modal to the front of the queue and sort based on priority to ensure priority is maintained.
    modalQueue.unshift(this);
    Modal.sortModalQueue();
  }

  get isOpen() {
    return ui.view.modal.current === this;
  }

  get component() {
    return this._component;
  }

  get props() {
    return this._props;
  }

  get priority() {
    return this._priority;
  }

  removeFromQueue() {
    EventHub.ui.offAll(this._component);
    ui.view.modal.queue = ui.view.modal.queue.filter(m => m._uniqueID !== this._uniqueID);
    if (ui.view.modal.queue.length === 0) ui.view.modal.current = undefined;
    else ui.view.modal.current = ui.view.modal.queue[0];
  }

  static sortModalQueue() {
    const modalQueue = ui.view.modal.queue;
    modalQueue.sort((x, y) => y.priority - x.priority);
    // Filter out multiple instances of the same modal.
    const singleQueue = [...new Set(modalQueue)];
    ui.view.modal.queue = singleQueue;
    ui.view.modal.current = singleQueue[0];
  }

  static hide() {
    if (!GameUI.initialized) return;
    ui.view.modal.queue.shift();
    if (ui.view.modal.queue.length === 0) ui.view.modal.current = undefined;
    else ui.view.modal.current = ui.view.modal.queue[0];
  }

  static hideAll() {
    if (!GameUI.initialized) return;
    while (ui.view.modal.queue.length) {
      if (ui.view.modal.queue[0].hide) {
        ui.view.modal.queue[0].hide();
      } else {
        Modal.hide();
      }
    }
    ui.view.modal.current = undefined;
  }

  static get isOpen() {
    return ui.view.modal.current instanceof this;
  }
}

class ChallengeConfirmationModal extends Modal {
  show(id) {
    super.show({ id });
  }
}

class TimeModal extends Modal {
  show(diff) {
    super.show({ diff });
  }
}

// If a new modal which can be shown in the same queue multiple times needs to be added
// Additional code needs to be written to account for that

Modal.hardReset = new Modal(HardResetModal, 1);
Modal.backupWindows = new Modal(BackupWindowModal, 1);

Modal.confirmationOptions = new Modal(ConfirmationOptionsModal);
Modal.infoDisplayOptions = new Modal(InfoDisplayOptionsModal);
Modal.awayProgressOptions = new Modal(AwayProgressOptionsModal);
Modal.hotkeys = new Modal(HotkeysModal);
Modal.animationOptions = new Modal(AnimationOptionsModal);
Modal.hiddenTabs = new Modal(HiddenTabsModal);

Modal.credits = new Modal(CreditsModal, 1);
Modal.changelog = new Modal(ChangelogModal, 1);
Modal.awayProgress = new Modal(AwayProgressModal);
Modal.loadGame = new Modal(LoadGameModal);
Modal.import = new Modal(ImportSaveModal);
Modal.autobuyerEditModal = new Modal(AutobuyerEditModal);

Modal.changePhone = new Modal(ChangePhoneModal);

Modal.message = new class extends Modal {
  show(text, props = {}, messagePriority = 0) {
    if (!GameUI.initialized) return;
    // It might be zero, so explicitly check for undefined
    if (this.currPriority === undefined) this.currPriority = messagePriority;
    else if (messagePriority < this.currPriority) return;

    super.show();
    this.message = text;
    this.callback = props.callback;
    this.closeButton = props.closeButton ?? false;
    EventHub.ui.offAll(this._component);
    if (props.closeEvent) this.applyCloseListeners(props.closeEvent);
  }

  hide() {
    EventHub.ui.offAll(this._component);
    this.currPriority = undefined;
    Modal.hide();
  }
}(MessageModal, 2);
