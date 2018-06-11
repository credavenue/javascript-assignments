mocha.setup("bdd");
const { assert } = chai;

describe("ToDo App", () => {
    const dummyEvent = {
        target: {
            type: '',
            id: '',
            tagName: '',
            innerText: ''
        }
    };
	it("Should add an item", () => {
        assert.equal(items.length, 0);
        addItem();
        assert.equal(items.length, 1);
    });
    
    it("Should delete an item", () => {
        let len = items.length;
        deleteItem();
        assert.equal(items.length,len-1 );
    });

    it("Should Complete an item", () => {
        items.length = 0;
        addItem();
        dummyEvent.target.type='checkbox';
        dummyEvent.target.id='0-checkbox';
        completeList(dummyEvent);
        assert.equal(items.length, 0);
        assert.equal(completedItems.length, 1);
    });
});

mocha.run();
