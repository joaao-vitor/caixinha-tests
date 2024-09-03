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
const loginForm = new LoginForm()
const createGroupForm = new CreateGroupForm()
describe('Criar Grupo', () => {
    describe('Criar Grupo sem o campo caminho', () => {
        const input = {
            nome: 'Grupo Teste',
            caminho: '',
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
        it(`Então deve aparecer a mensagem de erro`, {
            defaultCommandTimeout: 60000
        }, () => {
            createGroupForm.elements
                .mensagemErro()
                .should(
                    'be.visible',
                    'contains.text',
                    'O campo caminho é obrigatório!'
                )
        })
    })
    describe('Criar Grupo com 272 caracteres no nome', () => {
        const input = {
            nome: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, oeao owier truew',
            caminho: 'meu-grupo',
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
        it(`Então deve aparecer a mensagem de erro`, {
            defaultCommandTimeout: 60000
        }, () => {
            createGroupForm.elements
                .mensagemErro()
                .should(
                    'be.visible',
                    'contains.text',
                    'O campo nome deve conter no máximo 255 caracteres'
                )
        })
    })
})
