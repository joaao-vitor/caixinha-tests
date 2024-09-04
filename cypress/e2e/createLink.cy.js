import {random} from "mathjs";
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
        mensagemSucesso: () => cy.contains('Sucesso!').parent(),
        mensagemErro: () => cy.contains('Erro!').parent(),
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
class CreateLinkForm {
    elements = {
        novoLinkBtn: () => cy.get('button[type="button"]').contains('Novo Link'),
        nome: () => cy.get('#name'),
        link: () => cy.get('#link'),
        submit: () => cy.get('button[type="submit"]'),
        geolocalizacao: () =>
            cy
                .contains('Geolocalização')
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
                .contains('Controle de Acesssos')
                .parent()
                .parent()
                .find('button[type="button"]'),
        mensagemSucesso: () => cy.contains('Link adicionado ou grupo com sucesso!'),
    }
    clickNovoLink() {
        this.elements.novoLinkBtn().click()
    }
    typeNome(text) {
        if (!text) return
        this.elements.nome().type(text)
    }
    typeLink(text) {
        if (!text) return
        this.elements.link().type(text)
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
const createLinkForm = new CreateLinkForm()
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
function getRandomInt(min, max) { // Número aleatório para o link
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
const indice = getRandomInt(1, 100);
describe('Criar Link', () => {
    describe('Criar Link Com Sucesso', () => {
        const input = {
            nome: 'Link '+indice,
            link: 'linkteste'+indice+'.com',
        }
        it(`Dado que o usuário está autenticado`, () => {
            cy.window().then((win) => {
                const authData = JSON.parse(win.localStorage.getItem('auth_data'));
                return authData && authData.isAuthenticated === true;
            })
        })
        it('Estou na página Grupos e Links', () => {
            cy.visit('/groups')
        })
        it('E clico em Novo Link', {
            defaultCommandTimeout: 60000
        }, () => {
            createLinkForm.clickNovoLink()
        })
        it(`Então entro com ${input.nome} no campo nome`, () => {
            createLinkForm.typeNome(input.nome)
        })
        it(`E entro com ${input.link} no campo link`, () => {
            createLinkForm.typeLink(input.link)
        })
        it(`E clico no botão Ativo`, () => {
            createLinkForm.clickAtivo()
        })
        it(`Quando clico no botão Salvar`, () => {
            createLinkForm.clickSubmit()
        })
        it(`Então deve aparecer a mensagem de sucesso`,  {
            defaultCommandTimeout: 20000
        }, () => {
            createLinkForm.elements
                .mensagemSucesso()
                .should(
                    'be.visible',
                    'contains.text',
                    'Link adicionado ou grupo com sucesso!'
                )
        })
    })
})
