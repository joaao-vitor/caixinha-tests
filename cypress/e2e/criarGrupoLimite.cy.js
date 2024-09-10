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
const createGroupForm = new CreateGroupForm()
describe('Criar Grupo', () => {
    describe('Criar Grupo com 255 caracteres no nome', () => {
        const input = {
            nome: 'Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus aute',
            caminho: 'exemplo50d331',
        }

        it('Dado que o usuário está autenticado', () => {
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
        it(`Quando entro com ${input.caminho} no campo caminho`, () => {
            createGroupForm.typeCaminho(input.caminho)
        })
        it('Quando clico no botão Ativo', () => {
            createGroupForm.clickAtivo()
        })
        it('Quando clico no botão Enviar', () => {
            createGroupForm.clickSubmit()
        })
        it('Então deve aparecer a mensagem de sucesso', {
            defaultCommandTimeout: 60000
        }, () => {
            createGroupForm.elements
                .mensagemSucesso()
                .should(
                    'be.visible',
                    'contains.text',
                    'Grupo criado com sucesso!'
                )
        })
    })
    describe('Criar Grupo com 1 caractere no nome', () => {
        const input = {
            nome: 'Z',
            caminho: 'exemplomil31312',
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
        it(`Quando entro com ${input.caminho} no campo caminho`, () => {
            createGroupForm.typeCaminho(input.caminho)
        })
        it(`Quando clico no botão Ativo`, () => {
            createGroupForm.clickAtivo()
        })
        it(`Quando clico no botão Enviar`, () => {
            createGroupForm.clickSubmit()
        })
        it(`Então deve aparecer a mensagem de sucesso`, {
            defaultCommandTimeout: 60000
        }, () => {
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