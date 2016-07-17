describe('helloWorld', function() {
    it('should be a function', function() {
        expect(typeof helloWorld).toBe('function');
    });

    it('should return hello world', function() {
        expect(helloWorld()).toBe('Hello World');
    });
});