import { User } from "firebase/auth";
import { LitElement, html, customElement, state, eventOptions, css } from "lit-element";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { deleteAccount, signInGoogle, signOut, subscribeToUser } from "../firebase/auth";
import accountIconUrl from "../icons/account-circle.svg";

@customElement("account-button")
export class AccountButtonElement extends LitElement {
  static styles = css`
    :host {
      position: relative;
    }

    button {
      appearance: none;
      border: none;
      background-color: transparent;
      padding: 0;
    }

    .account {
      display: block;
      height: 48px;
      width: 48px;
      background-size: 24px;
      background-position: center;
      background-repeat: no-repeat;
    }

    .avatar {
      background-size: 32px;
      clip-path: circle(16px);
    }

    .menu {
      display: none;
      position: absolute;
      top: calc(100% - 4px);
      right: 4px;
      background-color: var(--background-color);
      padding: 8px 0;
      border-radius: 8px;
    }

    :host(:focus-within) .menu {
      display: grid;
    }

    .menu > * {
      white-space: nowrap;
      padding: 8px 12px;
      text-align: start;
    }
  `;

  @state()
  private user: User | null = null;

  unsubscribeFromUser?: () => void;

  connectedCallback() {
    super.connectedCallback();

    this.unsubscribeFromUser = subscribeToUser((user) => {
      this.user = user;
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.unsubscribeFromUser?.();
  }

  @eventOptions({ passive: true })
  private onClick() {
    this.focus();
  }

  @eventOptions({ passive: true })
  private signInGoogle() {
    signInGoogle();
  }

  @eventOptions({ passive: true })
  private signOut() {
    signOut();
  }

  @eventOptions({ passive: true })
  private deleteAccount() {
    if (confirm("Are you sure you want to delete your account?")) {
      deleteAccount();
    }
  }

  render() {
    return html`
      <button
        class="account ${classMap({ avatar: this.user?.photoURL != null })}"
        style="${styleMap({ "background-image": `url(${this.user?.photoURL ?? accountIconUrl})` })}"
        @click="${this.onClick}"
      ></button>
      <div class="menu">
        ${this.user == null
          ? html`<button @click="${this.signInGoogle}">Sign in with Google</button>`
          : html`<span>${this.user?.displayName}</span>
              <button @click="${this.signOut}">Sign Out</button>
              <button @click="${this.deleteAccount}">Delete Account</button>`}
      </div>
    `;
  }
}
