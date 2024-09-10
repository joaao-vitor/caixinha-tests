

class CreateGroupForm {
    elements = {
        novoGrupoBtn: () => cy.contains('Novo Grupo'),
        nome: () => cy.get('#name'),
        caminho: () => cy.get('#path'),
        submit: () => cy.get('button[type="submit"]'),
        mensagemSucesso: () => cy.contains('Grupo criado com sucesso!').parent(),
        mensagemErro: () => cy.contains('Erro!').parent(),
    }
    clickNovoGrupo() {
        this.elements.novoGrupoBtn().click();
    }
    typeNome(text) {
        if (!text) return;
        this.elements.nome().type(text);
    }
    typeCaminho(text) {
        if (!text) return;
        this.elements.caminho().type(text);
    }
    clickSubmit() {
        this.elements.submit().click();
    }
}

const createGroupForm = new CreateGroupForm();

describe('Criar Grupo - Causa e Efeito', () => {

    // Caso de Teste 1: Criar Grupo com Sucesso
    describe('Criar Grupo com Sucesso', () => {
        const input = {
            nome: 'Grupo Exemplo',
            caminho: 'novo-grupo',
        }

        it('Dado que o usuário está autenticado', () => {
            cy.getLocalStorage('4invite@user').then(($authData => {
                expect($authData.isAuthenticated === true)
            }))
        });

        it('Estou na página Grupos e Links', () => {
            cy.visit('/groups');
        });

        it('Estou na página Novo Grupo', () => {
            createGroupForm.clickNovoGrupo();
        });

        it(`Quando entro com ${input.nome} no campo nome`, () => {
            createGroupForm.typeNome(input.nome);
        });

        it(`Quando entro com ${input.caminho} no campo caminho`, () => {
            createGroupForm.typeCaminho(input.caminho);
        });

        it(`Quando clico no botão Enviar`, () => {
            createGroupForm.clickSubmit();
        });

        it('Então deve aparecer a mensagem de sucesso', {
            defaultCommandTimeout: 60000
        }, () => {
            createGroupForm.elements.mensagemSucesso().should('be.visible');
        });
    });

    // Caso de Teste 2: Tentar Criar Grupo sem Preencher Campos Obrigatórios
    describe('Tentar Criar Grupo sem Preencher Campos Obrigatórios', () => {
        const input = {
            nome: '',
            caminho: '',
        }

        it('Dado que o usuário está autenticado', () => {
            cy.getLocalStorage('4invite@user').then(($authData => {
                expect($authData.isAuthenticated === true)
            }))
        });

        it('Estou na página Grupos e Links', () => {
            cy.visit('/groups');
        });

        it('Estou na página Novo Grupo', () => {
            createGroupForm.clickNovoGrupo();
        });

        it('Quando deixo o campo nome vazio', () => {
            createGroupForm.typeNome(input.nome);
        });

        it('Quando deixo o campo caminho vazio', () => {
            createGroupForm.typeCaminho(input.caminho);
        });

        it('Quando clico no botão Enviar', () => {
            createGroupForm.clickSubmit();
        });

        it('Então deve aparecer a mensagem de erro', {
            defaultCommandTimeout: 60000
        }, () => {
            createGroupForm.elements.mensagemErro()
                .should('be.visible')
                .and('contain.text', 'Os campos "Nome do Grupo" e "Caminho" são obrigatórios.');
        });
    });

});
