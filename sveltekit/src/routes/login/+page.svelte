<main>
    <div id="login-box"> 
        <h1>photo album</h1>
        <h3>log in to see photos</h3>
        <form id="auth-buttons"
              method="POST">
            <button formaction="?/login&provider=google">
                <img alt="" 
                     src="/google_logo.svg"/>
                continue with google
            </button>
            <button formaction="?/login&provider=discord">
                <img alt=""
                     src="/discord_logo.svg"/>
                continue with discord
            </button>
        </form>
    </div>
</main>

<style lang="scss"> 
/* hide global navbar */
:global(body) { padding: 0    !important; }
:global(nav)  { display: none !important; }

main {
    width: 100vw;
    width: 100dvw;
    height: 100vh;
    height: 100dvh;

    display: flex;
    justify-content: center;
    align-items: center;
}

#login-box {
    width: 528px;
    height: 540px;

    display: flex;
    align-items: center;
    flex-direction: column;

    border-radius: 2px;

    background: #fefefe;
    box-shadow: 0px 5px 24px -4px rgba(#333, 0.15);

    h1 {
        position: relative;
        padding-top: 120px;

        font-size: 56px;
        font-weight: 500;
    }

    h3 {
        position: relative;
        padding-top: 10px;

        font-size: 20px;
        font-weight: 400;
    }

    #auth-buttons {
        position: relative;
        padding-top: 66px;

        display: flex;
        flex-direction: column;
        gap: 16px;

        button {
            all: unset;
            
            width: calc(272px - 48px);
            height: 48px;
            padding: 0px 24px;

            display: flex;
            align-items: center;
            gap: 24px;

            border-radius: 2px;

            font-family: 'Inter', sans-serif;
            font-size: 16px;

            box-shadow: 0px 4px 26px -2px rgba(#333, 0.15);

            cursor: pointer;
        }
    }
}

@media only screen and (max-width: 600px) {
    #login-box {
        height: 100%;
        width: 100%;

        overflow: hidden;
        overflow: -moz-hidden-unscrollable;
    }
}
</style>
