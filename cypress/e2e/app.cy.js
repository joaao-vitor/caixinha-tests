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
class CreateGroupForm {
    elements = {
        novoGrupoBtn: () => cy.contains('Novo Grupo'),
        nome: () => cy.get('#name'),
        caminho: () => cy.get('#path'),
        tipo: () => cy.get('#type'),
        submit: () => cy.get('button[type="submit"]'),
        geolocalizacao: () =>
            cy
                .contains('Usa Geolocalização')
                .parent()
                .parent()
                .find('button[type="button"]'),
        ativo: () =>
            cy
                .contains('Ativo')
                .parent()
                .parent()
                .find('button[type="button"]'),
        tokenDeAcesso: () =>
            cy
                .contains('Token de Acessso')
                .parent()
                .parent()
                .find('button[type="button"]'),
        mensagemSucesso: () => cy.contains('Grupo criado com sucesso!'),
    }
    clickNovoGrupo() {
        this.elements.novoGrupoBtn().click()
    }
    typeNome(text) {
        if (!text) return
        this.elements.nome().type(text)
    }
    typeCaminho(text) {
        if (!text) return
        this.elements.caminho().type(text)
    }
    clickGeolocalizacao() {
        this.elements.geolocalizacao().click()
    }
    clickAtivo() {
        this.elements.ativo().click()
    }
    clickTokenDeAcesso() {
        this.elements.tokenDeAcesso().click()
    }
    clickSubmit() {
        this.elements.submit().click()
    }
}
const loginForm = new LoginForm()
const createGroupForm = new CreateGroupForm()
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
    })
})

describe('Criar Grupo', () => {
    describe('Criar Grupo Com Sucesso', () => {
        const input = {
            nome: 'Grupo Teste',
            caminho: 'grupoteste',
        }
        it('Estou na página Grupos e Links', () => {
            cy.visit('/groups')
        })
        it('Estou na página Novo Grupo', () => {
            createGroupForm.clickNovoGrupo()
        })
        it(`Quando entro com ${input.nome} no campo nome`, () => {
            createGroupForm.typeNome(input.nome)
        })
        it(`Quando entro com ${input.caminho} no campo nome`, () => {
            createGroupForm.typeCaminho(input.caminho)
        })
        it(`Quando clico no botão Ativo`, () => {
            createGroupForm.clickAtivo()
        })
        it(`Quando clico no botão Enviar`, () => {
            createGroupForm.clickSubmit()
        })
        it(`Então deve aparecer a mensagem de sucesso`, () => {
            createGroupForm.elements
                .mensagemSucesso()
                .should(
                    'be.visible',
                    'contains.text',
                    'Grupo criado com sucesso!'
                )
        })
    })
})
