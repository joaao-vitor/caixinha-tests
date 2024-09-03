class LoginForm {
    elements = {
        email: () => cy.get('#email-address'),
        password: () => cy.get('#password'),
        submit: () => cy.get('button[type="submit"]'),
    }
    typeEmail(text) {
        if (!text) return
        this.elements.email().type(text)
    }
    typePassword(text) {
        if (!text) return
        this.elements.password().type(text)
    }
    clickSubmit() {
        this.elements.submit().click()
    }
}
const loginForm = new LoginForm()

describe('Login', () => {
    describe('login com sucesso', () => {
        const input = {
            email: 'test@test.com',
            password: 'secretxxx',
        }
        it('Estou na página de login', () => {
            cy.visit('/')
        })

        it(`Quando eu entrar com "${input.email} no campo email"`, () => {
            loginForm.typeEmail(input.email)
        })
        it(`Quando eu entrar com "${input.password} no campo senha"`, () => {
            loginForm.typePassword(input.password)
        })
        it(`Clico no botão entrar"`, () => {
            loginForm.clickSubmit()

        })
        it(`Dado que o usuário está autenticado`, () => {
            cy.waitUntil(() =>
                cy.window().then((win) => {
                    const authData = JSON.parse(win.localStorage.getItem('4invite@user'));
                    return authData && authData.isAuthenticated === true;
                }),
                {
                    timeout: 60000, // Tempo máximo de espera em milissegundos
                    interval: 500, // Intervalo de verificação
                    errorMsg: 'A autenticação demorou mais do que o esperado.', // Mensagem de erro personalizada
                }
            )
        })
    })
})
